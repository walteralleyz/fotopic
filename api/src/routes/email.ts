import { Router } from 'express';

import { sendEmail } from '../controller/auth';

export const routes = [
	Router().post('/incoming', (request: any, response: any) => {
		const { name, email, msg } = request.body;

		if(!name || !email || !msg) response.status(400).json({ error: 'Falhou!' });
		const content = `
			content: ${msg}
			from: ${email}
		`;

		sendEmail('walterdasilvasantos@gmail.com', content, 'Email cliente');

		response.status(201).json({ success: 'Ok' });
	})
];
