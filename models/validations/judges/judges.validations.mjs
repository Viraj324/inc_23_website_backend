import { body, check, oneOf } from 'express-validator';
import { eventsName, projectDomains, slotsData } from '../../../static/eventsData.mjs';

function getJudgeValidation() {
    return [
        oneOf([
            check('jid')
                .trim()
                .isLength({ min: 12, max: 12 }).withMessage('Judge ID must be 12 characters long')
                .escape()
                .matches(/^[a-zA-Z0-9-]+$/).withMessage('Judge ID must be alphanumeric'),

            check('email').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
            check('phone').trim().escape().isMobilePhone().withMessage('Invalid phone'),
        ])
    ]
}

function insertJudgeValidation() {
    const projectDomainsArray = Object.keys(projectDomains)
    const slotsDataArray = Object.keys(slotsData)

    return [
        body('name').trim().isLength({ min: 3, max: 100 }).isAlpha('en-US', { ignore: ' .' }).escape().withMessage('Invalid name'),
        body('email').isEmail().withMessage('Invalid email'),
        body('phone').trim().escape().isMobilePhone().withMessage('Invalid phone'),
        // body('commercial_address').trim().isLength({ min: 4, max: 100 }).isAlphanumeric('en-US', { ignore: ' ,.-\'()' }).escape().withMessage('Invalid commercial address'),
        // body('residential_address').trim().isLength({ min: 4, max: 100 }).isAlphanumeric('en-US', { ignore: ' ,.-\'()' }).escape().withMessage('Invalid residential address'),
        body('company').trim().isLength({ min: 0, max: 100 }).if(body('company').isLength({ min: 1, max: 100 })).isAlphanumeric('en-US', { ignore: ' ,.-\'()' }).escape().withMessage('Invalid company name'),
        body('exp').trim().isInt({ min: 0, max: 90 }).escape().withMessage('Invalid year of experience'),
        body('domains').isArray({ min: 1, max: 6 }).withMessage('domains should be an array of size [1 - 6]').custom(domains => domains.every(domain => projectDomainsArray.includes(domain.trim()))).withMessage('Invalid domains selected'),
        body('slots').isArray({ min: 1, max: 6 }).withMessage('slots should be an array of size [1 - 6]').custom(slots => slots.every(slot => slotsDataArray.includes(slot.trim()))).withMessage('Invalid slots selected'),
        body('min_projects').trim().isInt({ min: 3, max: 10 }).escape().withMessage('Invalid minimum projects selected'),
        body('isPICT').trim().isString().isIn(['', '1', '0']).withMessage('Invalid option selected'),
        body('referral').isLength({ min: 0, max: 100 }).if(body('referral').isLength({ min: 1, max: 100 })).isAlpha('en-US', { ignore: ' .,' }).escape().withMessage('Invalid referral'),
    ]
}

function loginJudgeValidation() {
    return [
        body('username').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
        body('password').trim().isLength({ min: 8, max: 100 }).escape().withMessage('Invalid password'),
    ]
}

export const judgesValidations = {
    getJudgeValidation,
    insertJudgeValidation,
    loginJudgeValidation,
}