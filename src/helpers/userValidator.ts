import { body, validationResult } from 'express-validator';

export const checkCreate = [
    body('name').not().isEmpty().isLength({ min: 4 }),
    body('email').not().isEmpty().isEmail()
];

export const checkLogin = [
    body('email').not().isEmpty().isEmail()
];

export const regularHandler = (request: any, response: any, next: any) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        const error = errors.array()[0];

        return response.status(400).json({ error });
    }

    next();
};