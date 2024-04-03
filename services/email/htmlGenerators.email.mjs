import path from 'path';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';

const __dirname = path.resolve()
const eventsTemplate = readFileSync(__dirname + '/views/emails/eventRegistration.email.ejs', 'utf8')
const judgeTemplate = readFileSync(__dirname + '/views/emails/judgeRegistration.email.ejs', 'utf8')
const onlineConceptsJudgeAllocationTemplate = readFileSync(__dirname + '/views/emails/online.concepts.judgeAllocation.email.ejs', 'utf8')
const offlineConceptsJudgeAllocationTemplate = readFileSync(__dirname + '/views/emails/offline.concepts.judgeAllocation.email.ejs', 'utf8')
const offlineImpetusJudgeAllocationTemplate = readFileSync(__dirname + '/views/emails/offline.impetus.judgeAllocation.email.ejs', 'utf8')
const onlineImpetusJudgeAllocationTemplate = readFileSync(__dirname + '/views/emails/online.impetus.judgeAllocation.email.ejs', 'utf8')

async function eventRegistrationEmail(data) {
    try {
        return ejs.render(eventsTemplate, { data, filename: __dirname + '/views/emails/eventRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        throw err
    }
}

async function judgeRegistrationEmail(judge) {
    try {
        // console.log(judge)
        return ejs.render(judgeTemplate, { judge, filename: __dirname + '/views/emails/judgeRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        throw err
    }
}

async function sendAllocationEmail(event_name, projects, judge, judgeCredentials) {
    try {
        console.log("judgeCred : ", judgeCredentials)
        // return ejs.render(onlineConceptsJudgeAllocationTemplate, { data: { projects, judge }, filename: __dirname + '/views/emails/online.concepts.judgeAllocation.email.ejs', cache: true, async: true })
        return ejs.render(offlineConceptsJudgeAllocationTemplate, { data: { projects, judge, judgeCredentials }, filename: __dirname + `/views/emails/offline.${event_name}.judgeAllocation.email.ejs`, cache: true, async: true })
        // return ejs.render(onlineImpetusJudgeAllocationTemplate, { data: { projects, judge }, filename: __dirname + '/views/emails/online.impetus.judgeAllocation.email.ejs', cache: true, async: true })
        // return ejs.render(offlineImpetusJudgeAllocationTemplate, { data: { projects, judge }, filename: __dirname + '/views/emails/offline.impetus.judgeAllocation.email.ejs', cache: true, async: true })
        // switch (event_name) {
        //     case 'concepts':

        //     case 'impetus':
        // }
    } catch (err) {
        throw err
    }
}

export default {
    eventRegistrationEmail,
    judgeRegistrationEmail,
    sendAllocationEmail,
}