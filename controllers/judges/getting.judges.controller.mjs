import eventsServices from '../../services/database/events/events.database.services.mjs';
import { AppError, clearCookie, createToken, sendCookie, verifyToken } from '../../utils/index.js';

function gettingJudgesController(judgesServices, eventsService) {
    async function getJudgeFromToken(req, res, next) {
        try {
            const { token } = req.signedCookies
            const judge = await judgesServices.getJudge({ jid: token, columns: "*" })
            res.status(302).json(judge)
        } catch (err) { next(err) }
    }

    async function getJudges(req, res, next) {
        try {
            const { event_name } = req.params
            const judges = await judgesServices.getJudges(event_name)
            res.status(302).json(judges)
        } catch (err) { next(err) }
    }

    async function loginJudge(req, res, next) {
        try {
            const { username, password } = req.body

            const judge = await judgesServices.loginJudge({ username, password })
            if (!judge) {
                res = await clearCookie(res, 'token', '/judge')
                throw new AppError(404, 'fail', 'Invalid credentials')
            }

            sendCookie(
                res,
                { token: judge.jid },
                '/judge'
            ).status(200).end()
        } catch (err) { next(err) }
    }

    async function getProjects(req, res, next) {
        try {
            const results = await eventsServices.getProjects(req.params.event_name)
            if (!results) throw new AppError(404, 'fail', 'No Projects Found')
            res.status(200).json(results)
        } catch (err) {
            next(err)

        }
    }

    async function getAllocatedProjects(req, res, next) {
        try {
            const { jid } = req.params
            const getAllocatedProjects = await judgesServices.getAllocatedProjects(jid)
            if (!getAllocatedProjects) throw new AppError(404, 'fail', 'No Projects Found')
            res.status(200).json(getAllocatedProjects)

        } catch (err) {
            next(err)
        }
    }

    async function getJudgeFromJid(req, res, next) {
        try {
            const { jid } = req.params
            // console.log(jid)
            const judge = await judgesServices.getJudge(jid )
            res.status(302).json(judge)
        } catch (err) { next(err) }
    }

    async function modifySlots(req, res, next) {
        try {
            const { jid } = req.params
            const { slots, mode } = req.body
            await judgesServices.modifySlots(jid, slots, mode || '0')
            res.status(200).end()
        } catch (err) { next(err) }
    }

    async function getAllocatedProjectsofJudge(req, res, next) {
        try {
            const { jid } = req.params
            const result = await judgesServices.getAllocatedProjectsofJudge(jid)

            const projectsNotEvaluated = [];
            const projectsEvaluated = [];
            // console.log(result[0]['allocated_projects'].split(','))

            const allocatedProjectIds = result[0]['allocated_projects'].split(',').map(pid => pid.trim());

            // console.log("allocatedprojects", allocatedProjectIds)

            for (const pid of allocatedProjectIds) {
                const noteval = await judgesServices.getProjectsNotEvaluatedByJudge(jid, [pid]);
                if (noteval !== null) {
                    projectsNotEvaluated.push(noteval);
                } else {
                    projectsEvaluated.push(pid)
                }
            }

            // console.log("projectsNotEvaluated", projectsNotEvaluated);
            // console.log("projectsEvaluated", projectsEvaluated);
            const mergedProjects = { projectsNotEvaluated, projectsEvaluated };
            res.status(200).json(mergedProjects);
        } catch (err) { next(err) }
    }


    return {
        getJudgeFromToken,
        getJudges,
        loginJudge,
        getProjects,
        getAllocatedProjects,
        getJudgeFromJid,
        modifySlots,
        getAllocatedProjectsofJudge
    }
}

export default gettingJudgesController;