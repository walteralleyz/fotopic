import { body, validationResult } from 'express-validator';

export const checkCreate = [
    body('store').not().isEmpty().isLength({ min: 4 }),
    body(['section', 'item', 'quantity', 'type']).isArray({ min: 1 }),
    body('email').isEmail()
];

export const checkUpdate = [
    body('store').not().isEmpty().isLength({ min: 4 }),
    body(['section', 'item', 'quantity', 'type']).isArray({ min: 1 })
];

export const regularValidation = (request: any, response: any, next: any) => {
    const errors = validationResult(request);
    
    if(!errors.isEmpty()) {
        const error = errors.array()[0];

        return response.status(400).json({ error });
    }

    next();
}