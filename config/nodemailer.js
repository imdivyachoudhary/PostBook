const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./env");

let transporter = nodemailer.createTransport({
    service: "gamil",
    host:"smtp.gmail.com",
    port:587,
    secure: false,
    auth:{
        user: env.smtp_user,
        pass: env.smtp_password,
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(path.join(__dirname,"../views/mailers", relativePath), data, function(error, template){
        if(error){
            console.log("Error in rendering Template : ",error);
            return;
        }
        mailHTML = template;
    })
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}