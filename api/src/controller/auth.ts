import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();

export const sendEmail = (email: string, content: string, sub: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PSWD
        }
    });

    transporter.sendMail({
        from: `"Flavio" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: sub,
        html: content
    });
};
	
export const verifyJWT = (request: any, response: any, next: any) => {
    var token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({ error: 'No token provided.' });
    
    JWT.verify(token, process.env.JWT_SECRET, function(err: any, decoded: any) {
      if (err) return response.status(500).json({ error: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      request.userCode = decoded.code;
      next();
    });
}
