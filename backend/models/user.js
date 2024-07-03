const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "First Name is Required"] }, //customised the error message 
    lastName: { type: String, required: [true, "Last Name is Required"] },//customised the error message 
    Avatar: { type: String },
    email: {
        type: String, required: [true, "Email is Required"],
        //here we are validating email and String(email) will convert it to string and match will match the correct format of email the expression in match is email regular expression
        validate: {
            validator: function (email) {
                return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            },
            message: (props) => { `Email ${props.value} is invalid` } //this will show the message in case of wong email format and props.value will conatin email  
        }
    },
    password: { type: String },
    passwordConfirm: { type: String },

    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    verified: { type: Boolean, default: false }, // we can set default values
    otp: {   type: String, },
    otp_expiry_time: { type: Date },
    socket_id: {
        type: String,
    },
    friends:[{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        enum: ["Online", "Offline"]
    }
})


userSchema.pre("save", async function (next) {

    //this method will encypt the otp 

    //only run if otp is send
    if (!this.isModified("otp") || !this.otp) return next();
    //hash the OTP with the cost of 12
    this.otp = await bcrypt.hash(this.otp.toString(), 12);
    next();
})
userSchema.pre("save", async function (next) {

    //this method will encypt the password 


    //only run if password is changed
    
    if (!this.isModified("password") || !this.password) return next();
    //hash the password with the cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


//this method is used to compare password of submit and stored in database
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
    return await bcrypt.compare(candidateOTP, userOTP)
}
userSchema.methods.createPasswordResetToken= function (){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
this.passwordResetExpires = Date.now() + 10*60*1000
    return resetToken;

}

userSchema.methods.changedPasswordAfter = function(timestamp){
        return timestamp < this.passwordChangedAt;
}
//this User name we are passing in this model it will create a folder in our database with this name
const User = new mongoose.model("User", userSchema);

module.exports = User