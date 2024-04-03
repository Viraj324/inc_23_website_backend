function judgesQueries(tableName) {
  const getJudge = (data) => {
    // if (data.hasOwnProperty('email')) return `SELECT * FROM ${tableName} WHERE email = '${data.jid}' LIMIT 1;`
    // if (data.hasOwnProperty('jid')) return `SELECT * FROM ${tableName} WHERE jid = '${data.jid}';`

    return `SELECT * FROM ${tableName} WHERE jid = '${data}';`
  }

  const getJudges = event_name => `CALL getJudges('"${event_name}"');`

  const insertJudge = 'CALL insertJudge(:events, :jid, :name, :email, :phone, :residential_address, :commercial_address, :company, :exp, :domains, :slots, :min_projects, :referral, :password, :roles, :isPICT);'

  const getJudgeCreds = (email) => {
    return `SELECT * FROM admin WHERE username = '${email}';`
  }

  const loginJudge = 'CALL loginJudge(:username, :password);'

  const getAllocatedProjects = (jid, event_name) => `SELECT ${event_name}_projects.pid, title , abstract , allocations.slots, domain, allocations.event_name, ${event_name}_projects.lab FROM ${event_name}_projects JOIN allocations ON ${event_name}_projects.pid = allocations.pid WHERE allocations.jid='${jid}' AND allocations.event_name = '${event_name}' AND ${event_name}_projects.pid NOT IN (SELECT ${event_name}_evaluation.pid FROM ${event_name}_evaluation WHERE ${event_name}_evaluation.pid = ${event_name}_projects.pid AND ${event_name}_evaluation.jid = '${jid}');`

  const modifySlots = (slots, jid, mode) => {
    slots = slots.map(slot => `"${slot}"`)
    return `UPDATE judges SET slots = '[${slots}]', mode = '${mode}' WHERE jid = '${jid}';`;
  }

  const insertImpetusEvaluation = "INSERT INTO impetus_evaluation (pid, jid, startUp, impact, original, patent, presentation, relevance, test) VALUES (:pid, :jid, :startUp, :impact, :original, :patent, :presentation, :relevance, :test);"

  const insertConceptsEvaluation = "INSERT INTO concepts_evaluation (pid, jid, innovation, approachToIdeas, approachToImplementation, principles, presentation) VALUES (:pid, :jid, :innovation, :approachToIdeas, :approachToImplementation, :principles, :presentation);"

  const existingAllocation = (pid, jid) => `SELECT COUNT(*) FROM allocations WHERE pid = '${pid}' AND jid = '${jid}';`
  const existingEvaluation = (pid, jid, event_name) => `SELECT COUNT(*) FROM ${event_name}_evaluation  WHERE pid = '${pid}' AND jid = '${jid}';`

  return {
    getJudge,
    getJudges,
    insertJudge,
    loginJudge,
    getJudgeCreds,
    getAllocatedProjects,
    modifySlots,
    insertConceptsEvaluation,
    insertImpetusEvaluation,
    existingAllocation,
    existingEvaluation
  }
}

export { judgesQueries }