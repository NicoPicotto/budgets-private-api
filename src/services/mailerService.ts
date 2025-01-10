import mailTransporter from '../config/mailer';
import { SendMailOptions } from 'nodemailer';

export class MailerService {

    static async sendMail(options: SendMailOptions): Promise<void> {
        try {
            const info = await mailTransporter.sendMail(options);
            console.log(
                `Email sent to: ${info}`
            );
        } catch (error) {
            console.error('Error al enviar correo:', error);
            throw new Error('Failed to send email');
        }
    }


    static async sendPasswordResetEmail(email: string, resetToken: string) {
        try {
            await this.sendMail({
                from: 'no-reply@example.com',
                to: email,
                subject: 'Reset your password',
                text: 'Thank you for signing up! -',
                html: '<p>Thank you for signing up!</p> token: <br>' + resetToken,
            });
            console.log('Reset password email sent');
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Failed to send email');
        }
    }

    static async sendInvitation(email: string, resetToken: string) {
        try {
            await this.sendMail({
                from: 'no-reply@example.com',
                to: email,
                subject: 'Welcome to Our Service',
                text: 'Thank you for signing up! -',
                html: '<p>Thank you for signing up!</p> token: <br>' + resetToken,
            });
            console.log('Invitation email sent');
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Failed to send email');
        }
    }


}
