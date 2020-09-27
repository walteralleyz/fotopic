import { body, validationResult } from 'express-validator';

export const checkCreate = [
    body('name').not().isEmpty().isLength({ min: 4 }),
    body('email').not().isEmpty().isEmail()
];

export const checkLogin = [
    body('email').not().isEmpty().isEmail()
];

export const checkUpdate = [
    body('email').not().isEmpty().isEmail(),
    body('name').isLength({ min: 4 }).not().isNumeric()
]

export const regularHandler = (request: any, response: any, next: any) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        const error = errors.array()[0];

        return response.status(400).json({ error });
    }

    next();
};