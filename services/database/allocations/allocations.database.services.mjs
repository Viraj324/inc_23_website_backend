import { allocationQueries } from "../../../models/index.js";
import { AppError } from "../../../utils/index.js";

function allocationServices(db) {
    async function getLabs(event_name) {
        try {
            const [results] = await db.execute(allocationQueries.getLabs(event_name)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results
        } catch (err) {
            throw err
        }
    }

    async function updateLab(event_name, data) {
        try {
            const preparedArray = [data.lab, ...data.pids]
            const [results] = await db.execute(allocationQueries.updateLab(event_name, data), preparedArray).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function allocate(event_name, data) {
        try {
            const [results] = await db.execute(allocationQueries.allocate(event_name, data.pids, data.jids, data.slots)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function deallocate(event_name, data) {
        try {
            const [results] = await db.execute(allocationQueries.deallocate(event_name, data.pids, data.jids)).catch(err => {
                throw new AppError(400, 'fail', err.sqlMessage)
            })
            return results[0]
        } catch (err) {
            throw err
        }
    }
    
    return {
        getLabs,
        updateLab,
        allocate,
        deallocate
    }
}

export default allocationServices;