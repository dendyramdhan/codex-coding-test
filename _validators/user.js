const { body } = require('express-validator');
const moment = require('moment');

module.exports = {
    authenticate: [
        body('email').notEmpty().isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    ],
    create: [
        body('fullName').notEmpty(),
        body('email').notEmpty().isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
        body('telepon').notEmpty().custom(val => {                
            return /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g.test(val);
        }),
        body('level').notEmpty().custom(val => {                
            return ['admin', 'member'].includes(val);
        })
    ],
    update: [
        body('fullName').optional(),
        body('password').optional().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
        body('telepon').optional().custom(val => {                
            return /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g.test(val);
        })
    ]
}