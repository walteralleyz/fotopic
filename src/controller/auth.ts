import nodemailer from 'nodemailer';

export const sendEmailSignin = (email: string, token: number) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: 'superlistanode@zohomail.com',
            pass: '6H8VfBr3fyMMv4K'
        }
    });

    transporter.sendMail({
        from: '"Flavio" <superlistanode@zohomail.com>',
        to: email,
        subject: 'Seu código de confirmação',
        html: `
            <div style="text-align: center">
                <h3>SuperLista</h3>
                <h5>Sua lista de compras online</h5>
            </div>
            <p>Seu código de confirmação é:</p>
            <h1>${token}</h1>
        `
    });
};