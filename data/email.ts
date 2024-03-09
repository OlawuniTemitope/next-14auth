
const nodemailer = require("nodemailer");

    const SendEmail= async( email:string,subject:string,html:string )=>{
        const transporter=nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        })
    
        const mailOptions={
            from: 'Olawuni Temitope <jesusson7admin@gmail.com>',
            to:email,
            subject:subject,
            text:html
        }
    
       await transporter.sendMail(mailOptions)
    }
    


export default SendEmail