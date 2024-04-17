import { eventsName } from '../../../static/eventsData.mjs';

function eventsQueries(tableName) {
    const checkUserRegistration = (event_name) => {
        switch (event_name) {
            case eventsName[0]:
                return `SELECT email FROM ${tableName.conceptsUsersTable} WHERE email = ?;`
            case eventsName[1]:
                return `SELECT email FROM ${tableName.impetusUsersTable} WHERE email = ?;`
            case eventsName[2]:
                return `SELECT email FROM ${tableName.pradnyaUsersTable} WHERE email = ?;`
        }
    }

    const completeRegistration = (event_name, no_of_members) => {
        // console.log(event_name)
        let placeholders = ''
        if (event_name === 'pradnya') {
            for (let i = 0; i < no_of_members; i++) placeholders += ', ?, ?, ?, ?, ?'
        } else {
            // console.log("Hello")
            for (let i = 0; i < no_of_members; i++) placeholders += ', ?, ?, ?, ?'
        }
        // console.log(placeholders);
        return process.env[`INSERT_${event_name.toUpperCase()}_${no_of_members}`] + placeholders + ');'
    }

    const insertPICT = (no_of_members) => {
        let placeholders = ''
        for (let i = 0; i < no_of_members; i++) placeholders += ', ?, ?, ?'
        return 'CALL insert_c_internal_' + `${no_of_members}` + '(?,?,?,?,?,?' + placeholders + ');'
    }

    const insertImpetusPICT = (no_of_members) => {
        let placeholders = ''
        for (let i = 0; i < no_of_members; i++) placeholders += ', ?, ?, ?'
        return 'CALL insert_i_internal_' + `${no_of_members}` + '(?,?,?,?,?' + placeholders + ');'
    }

    const getRegistrations = () => 'CALL getRegistrations(?);'

    // const getProjects = (data) => `SELECT title, ${data}_projects.pid ,  abstract , domain, mode FROM ${data}_projects INNER JOIN ${data}_group_info ON ${data}_projects.pid = ${data}_group_info.pid;`

    const getProjects = (data) => `SELECT title, ${data}_projects.pid ,  abstract , domain, mode 
    FROM ${data}_projects 
    INNER JOIN ${data}_group_info ON ${data}_projects.pid = ${data}_group_info.pid 
    WHERE ${data}_projects.pid NOT IN (
        'CO-DS1011', 'CO-ML1100', 'CO-ML1115', 'CO-CN1017', 'CO-CN1014',
        'CO-ML1015', 'CO-ML1066', 'CO-ML0001', 'CO-ML1088', 'CO-OT0020',
        'CO-ML1048', 'CO-OT1053', 'CO-AD0012', 'CO-CN1012', 'CO-OT0027',
        'CO-AD1022', 'CO-ML1058', 'CO-DS1003', 'CO-AD1032', 'CO-OT0025',
        'CO-CN1008', 'CO-DS1024', 'CO-OT0017', 'CO-ML1073', 'CO-ML0002',
        'CO-CN0003', 'CO-DS1026', 'CO-AD0007', 'CO-ML1033', 'CO-ML1116',
        'CO-OT0040', 'CO-OT1056', 'CO-AD0010', 'CO-DS1014',
        'CO-CN0004', 'CO-OT1043', 'CO-AD0028', 'CO-AD1011',
        'CO-CN1009', 'CO-AD0004', 'CO-DS1016', 'CO-CN1013',
        'CO-DS0033', 'CO-OT1039', 'CO-AD0020', 'CO-ML1118'
    );`

    const getProject = ({ event_name, pid }) => `SELECT title, ${event_name}_projects.pid ,  abstract , domain, mode FROM ${event_name}_projects INNER JOIN ${event_name}_group_info ON ${event_name}_projects.pid = ${event_name}_group_info.pid WHERE ${event_name}_projects.pid IN (${pid});`

    const updateProject = (data) => `UPDATE _projects INNER JOIN ${data.event_name}_group_info ON ${data.event_name}_projects.pid = ${data.event_name}_group_info.pid SET ${data.event_name}_projects.title = :title, ${data.event_name}_projects.abstract = :abstract, ${data.event_name}_group_info.mode = :mode WHERE ${data.event_name}_projects.pid = :pid;`


    const getProjectAbstractQ = (pid, event_name) => {
        return `SELECT title, abstract FROM ${event_name}_projects where pid = '${pid}'`;
    }

    const updateProjectAbstractQ = (event_name, pid, abstract) => {
        const escapedAbstract = abstract.replace(/'/g, "\\'").replace(/"/g, '\\"');
        return `UPDATE \`${event_name}_projects\` SET abstract = '${escapedAbstract}' where pid = '${pid}' ;`
    };

    const getBackups = () => {
        return `SELECT t.pid, t.step_1, t.step_2, step_3
        FROM inc_2024.tickets t where t.pid = "IM-ML0056"`
    }




    return {
        checkUserRegistration,
        completeRegistration,
        insertPICT,
        insertImpetusPICT,
        getRegistrations,
        getProjects,
        getProjectAbstractQ,
        updateProjectAbstractQ,
        getProject,
        updateProject,
        getBackups
    }
}

export { eventsQueries }