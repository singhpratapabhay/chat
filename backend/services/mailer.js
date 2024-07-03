const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config({path: "../config.env"});

// sgMail.setApiKey(process.env.ap_KEY);

const sendSGMail = async ({recipient, sender, subject, html, attachments}) => {
    try {
        const from = sender || "contact@abhay.in";
        const msg = {
            to: recipient, //email of recipient
            from: from, //verified sender
            subject,
            html, //content that we want to send 
            text, //"ppjfih" if we want to send plain text to the user
            attachments,
        };
        return sgMail.send(msg);


    } catch (error) {
console.log(error)
    }
}

exports.sendEmail = async (args)=>{
if(process.env.NODE_ENV ==="development"){
     return new Promise.resolve();
}else{
    return sendSGMail(args);
}
}