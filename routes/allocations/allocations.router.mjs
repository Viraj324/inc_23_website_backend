import { Router } from 'express';
import { createAllocationController, gettingJudgesController } from '../../controllers/index.js';
import { getAllocationController } from '../../controllers/index.js';

const allocationsRouter = Router()

function createAllocationsRouter(emailServices, allocationServices, eventsServices, judgeServices, middlewares, adminValidations,) {
    const { verifyAdminLogin, validator } = middlewares
    const { verifyAdminValidation } = adminValidations
    const { labAllocate, allocate , deallocate } = createAllocationController(allocationServices, emailServices, eventsServices, judgeServices)
    const {getLabs, getEvalstats} = getAllocationController(allocationServices, emailServices, eventsServices, judgeServices)
    const { getAllocatedProjectsofJudge  } = gettingJudgesController(judgeServices, eventsServices)
    allocationsRouter.patch("/:event_name/lab", verifyAdminValidation(2), validator, verifyAdminLogin, labAllocate)
    allocationsRouter.post("/:event_name/allocate", verifyAdminValidation(2), validator, verifyAdminLogin, allocate)
    allocationsRouter.patch("/:event_name/deallocate",  deallocate)
    allocationsRouter.get("/:event_name/labs", getLabs)
    // get projects allocated to judges
    allocationsRouter.get("/projects/:jid", getAllocatedProjectsofJudge)
    allocationsRouter.get("/getevalstats/:event_name", getEvalstats);

    return allocationsRouter
}

export default createAllocationsRouter;