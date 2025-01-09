import nodemailer, { Transporter } from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

// Definir la configuración de transporte de nodemailer
let mailTransporter: Transporter;

if (process.env.NODE_ENV === "production") {
    console.log("Production environment - using SendGrid");
    mailTransporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_SECRET as string,
        })
    );

} else if (process.env.NODE_ENV === "staging") {
    console.log("Staging environment - using SendGrid");
    mailTransporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_SECRET as string,
        })
    );

} else {
    console.log("Development environment - using Gmail SMTP");
    mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'federico@fri3nds.com',
            pass: 'armc ygpc ciac imkr',
        },
    });
}

export default mailTransporter;
