import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();

export const sendEmailSignin = (email: string, token: number) => {
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
        from: '"Flavio" <superlistanode@zohomail.com>',
        to: email,
        subject: 'Seu código de confirmação',
        html: `
            <div style="text-align: center">
                <h1>SuperLista</h1>
                <h5>Sua lista de compras online</h5>
            </div>
            <p>Seu código de confirmação é:</p>
            <h1>${token}</h1>
        `
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