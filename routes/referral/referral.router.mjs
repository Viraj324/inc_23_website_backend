import { Router } from 'express';
import { referralController } from '../../controllers/index.js';

const referralRouter = Router()

function createReferralRouter(referralServices) {
    const { referralConcepts, referralImpetus } = referralController(referralServices)

    referralRouter.post('/concepts', referralConcepts)

    return referralRouter
}

export default createReferralRouter;