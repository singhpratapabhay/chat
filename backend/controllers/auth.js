const jwt = require("jsonwebtoken");
const User = require("../models/user");
const filterObj = require("../utils/filterObj")

const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");
const transporter = require("./sendMail");
const resetPassword = require("../templates/mail/resetPassword")
const { promisify } = require("util");
const signToken = (userId) => {
   
   return jwt.sign({ userId }, process.env.JWT_SECRET);
}
//Signup=> register=>send Otp=> Verify OTP


//login function
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            status: "error",
            message: "both email and password are required"
        })
    }

    const userDoc = await User.findOne({ email }).select("+password");
  
    if (!userDoc || !(await userDoc.correctPassword(password, userDoc.password))) { //correctPassword is present inside the user Schema
        res.status(400).json({
            status: "error",
            message: "Email or password is incorrect"
        })
        return;
    }

    const token = signToken(userDoc._id); //id of particular schema

    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
        user_id: userDoc._id
    })

}

//Register New User
exports.register = async (req, res, next) => {
    const {  email} = req.body;
 
    const filteredBody = filterObj(req.body, "firstName", "lastName", "password", "email")
    console.log(filteredBody)
    //check if a verified user with given email exists

    const existing_user = await User.findOne({ email });

    if (existing_user && existing_user.verified) {
        console.log(existing_user)

        res.status(400).json({
            status: "error",
            message: "Email is already in use, Please login",
        })
    } else if (existing_user) {
    await User.findOneAndUpdate({ email }, filteredBody, { new: true, validateModifiedOnly: true }) //new:true return the modified document rather than the original document before it was modified.  validateModifiedOnly: true validate only the fields that have been modified.
        //generate Otp and send email to user;
        existing_user.password = filteredBody.password;
        
        await existing_user.save();
        req.userId = existing_user._id;
      
        next();
    } else {
        //if user record is available
        const new_user = await User.create(filteredBody);
        //generate Otp and send email to user;
        req.userId = new_user._id;
      
        next();
    }


}

//send Otp to newUser

exports.sendOtp = async (req, res, next) => {
    const { userId } = req;
    const new_otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const otp_expiry_time = Date.now() + 10 * 60 * 1000 //10min after otp is send

 
    const user = await User.findByIdAndUpdate(userId, {
        otp_expiry_time: otp_expiry_time,
      });
    
      user.otp = new_otp.toString();
    
      await user.save({ new: true, validateModifiedOnly: true });
    
      console.log(new_otp);
    //Send Mail todo
// mailService.sendEmail({
//     from: "contact@gmail.in",
//     to: "example@gmail.com",
//     subject: "Otp for chatapp",
//     text: `Your OTP is ${new_otp}. This is valid for 10 Mins`,
// })

    res.status(200).json({
        status: "success",
        message: "OTP sent susccessfully"
    })
}

// verfiy OTP

exports.verifyOTP = async (req, res, next) => {
    //verify OTP and update user record accordingly

    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp_expiry_time: { $gt: Date.now() } });

    if (!user) {
        res.status(400).json({
            status: "error",
            message: "Email is Invalid or OTP expired"
        })
    }

    if (!await user.correctOTP(otp, user.otp)) {
        res.status(400).json({
            status: "error",
            message: "OTP is incorrect",
        })
        return;
    }

    // otp is correct

    user.verified = true;
    user.otp = undefined;

    await user.save({ new: true, validateModifiedOnly: true });
    const token = signToken(user._id); //id of particular schema

    res.status(200).json({
        status: "success",
        message: "OTP verified successfully",
        token: token,
        user_id: user.id
    })
}
// Types of routes => Protected (only logged in user access) and unprotected
exports.protect = async (req, res, next) => {
    //1) getting token (JWT) and check if it's there

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];


    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    } else {
        res.status.json({
            status: "error",
            message: "You are not logged In! Please log in to get access"
        })
        return;
    }

    //2 verification of token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    3// Check if user still Exist

    const this_user = await User.findById(decoded.userId);

    if (!this_user) {
        res.status(400).json({
            status: "error",
            message: "The user doesn't exist"
        })
    }

    // 4) check if user chnaged their password after token was issued
    if (this_user.changedPasswordAfter(decoded.iat)) {
        res.status(400).json({
            status: "error",
            message: "User recently updated password! Please log in again"
        })
    }

    req.user = this_user
    next();


}

exports.forgotPassword = async (req, res, next) => {
    // 1) get user email
    const {email} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({
            status: "error",
            message: "There is no user with given email address"
        })
        return;
    }
    //2) generate random reset token 
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false})
    const resetUrl = `http://localhost:3000/auth/new-password?token=${resetToken}`;

    const mailOptions= {
        from:process.env.MAIL,
        to: "kaspersingh4@gmail.com",
        subject: 'Password Reset',
        html: resetPassword(user.firstName, resetUrl)
    }
    try {
        //TODO=> send email;
    //  await transporter.sendMail(mailOptions, (error, info)=>{
    //     if(error){
    //         console.log("error==============="+ error.message);
    //         return process.exit(1)
    //     }
    
    //  });
    
        console.log('Email sent successfully');
        res.status(200).json({
            status: "success",
            message: "Reset Password link sent to email",
           
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500).json({
            status: "error",
            message: "there was an error sending the email, please try again later"
        })
    }
}
exports.resetPassword = async (req, res, next) => {
    // 1)  get user based on token
    const hashedToken = crypto.createHash("sha256").update(req.body.token).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    // 2) token expired or wrong token
    if (!user) {
        res.status(400).json({
            status: "error",
            message: "token is invalid or expired"
        })
        return;
    }
    if(!req.body.password || !req.body.passwordConfirm){
        res.status(400).json({
            status: "error",
            message: "passowrd or confirm password is missing"
        })
        return;
    }
    //3 update user password and reset token and expiry to undefine
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    //4) Log in the User and send new Jwt

    //TODO=> send an email to user informing about password reset

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        message: "Password Reseted successfully",
        token,
    });
}