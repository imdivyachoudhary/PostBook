const nodeMailer = require("../config/nodemailer");

exports.passwordUpdated = (user) => {
    console.log("Inside Password Updated Mailer");

    nodeMailer.transporter.sendMail({
        from: "mail@postbook.in",
        to: user.email,
        subject: "Password Update",
        html: "<h1>Your Password has been updated successfully</h1>"
    }, (error, info) => {
        if(error){
            console.log("Error in sending email : ",error);
            return;
        }
        console.log("Email Sent", info);
        return;
    })
}