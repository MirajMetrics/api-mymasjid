import 'dotenv/config';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

class SendMail{
    static async send(email,pesan){

        try {
            
        } catch (error) {
            
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service:'Yahoo',
            secure: false,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            logger: true
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP untuk Reset Kata Sandi',
            text: pesan,
        }

        const data = await transporter.sendMail(mailOptions);
        
        return data;
    }


    static async sendGmail(email,pesan){
        const oauth2Client = new google.auth.OAuth2(
            process.env.GMAIL_CLIENT_ID, // Ganti dengan client ID Anda
            process.env.GMAIL_CLIENT_SECRET, // Ganti dengan client secret Anda
            'https://developers.google.com/oauthplayground' // Ganti dengan redirect URI yang diizinkan
        );

        // Mendapatkan URL autorisasi untuk mendapatkan refreshToken
        const authorizeUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.send',
        });

        console.log(`Buka URL ini untuk mendapatkan refreshToken:\n${authorizeUrl}`);

        // Izinkan pengguna membuka URL dan mengizinkan aplikasi
        // Setelah itu, masukkan refreshToken di bawah ini

        const refreshToken = process.env.GMAIL_REFRESH_TOKEN; // Ganti dengan refreshToken yang diberikan pengguna

            oauth2Client.setCredentials({
                refresh_token: refreshToken,
            });

            const accessToken = process.env.GMAIL_ACCESS_TOKEN//await oauth2Client.getAccessToken();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER_MAILER, // Ganti dengan alamat Gmail Anda
                clientId: process.env.GMAIL_CLIENT_ID_MAILER, // Ganti dengan client ID Anda
                clientSecret: process.env.GMAIL_CLIENT_SECRET_MAILER, // Ganti dengan client secret Anda
                refreshToken: refreshToken,
                accessToken: accessToken,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_USER_MAILER, // Ganti dengan alamat Gmail Anda
                to: email,
                subject: 'OTP untuk Reset Kata Sandi via gmail',
                text: pesan,
            };

            const data = await transporter.sendMail(mailOptions);

            return data
    }

    // EmailService.sendGmail('recipient@example.com', 'Ini adalah pesan uji.').then(response => {
    // console.log('Email sent:', response);
    // }).catch(error => {
    // console.error('Error sending email:', error);
    // });



}

export default SendMail;