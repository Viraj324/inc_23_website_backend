import { filesQueries } from '../../../models/index.js';
import { AppError, fileToBase64 } from "../../../utils/index.js";

function filesServices(db) {
    async function checkFile(email) {
        try {
            const [results] = await db.execute(filesQueries.checkFile('*'), [email]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err.message || err)
        }
    }

    async function insertFile(email, file) {
        try {
            const { originalname, mimetype, size, buffer } = file
            const file_name = `${email} - ${originalname}`
            const [results] = await db.execute(filesQueries.insertFile, [email, file_name, size, fileToBase64(buffer, mimetype)]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err.message || err)
        }
    }

    async function getIDFile(emails) {
        try {
          const [results] = await db.execute(`SELECT * FROM files_verify`)

          console.log(results)
        //   return results.reduce((acc, cur) => {
        //     acc[cur.email] = cur.file;
        //     return acc;
        //   }, {});
        return results;
        } catch (err) {
          throw new AppError(500, 'fail', err.message || err);
        }
      }
      
      

    return {
        checkFile,
        insertFile,
        getIDFile
    }
}

export default filesServices;