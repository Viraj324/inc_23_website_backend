function createAllocationController(allocationServices, emailServices, eventsServices, judgeServices) {
  async function labAllocate(req, res, next) {
    try {
      const { event_name } = req.params
      await allocationServices.updateLab(event_name, req.body)
      res.status(200).end()
    } catch (err) {
      next(err)
    }
  }

  async function allocate(req, res, next) {
    try {
      const { event_name } = req.params
      const { jids } = req.body
      // console.log(event_name, req.body)
      await allocationServices.allocate(event_name, req.body)
      const judge = await judgeServices.getJudge(jids[0])
      const judgeCredentials = await judgeServices.getCredentials(judge.email)
      // console.log(judgeCredentials)
      const projects = await eventsServices.getProject(event_name, req.body.pids)
      await emailServices.sendAllocationEmail(event_name, projects, judge, judgeCredentials)
      res.status(200).end()
    } catch (err) { next(err) }
  }

  async function deallocate(req, res, next) {
    try {
      const { event_name } = req.params
      await allocationServices.deallocate(event_name, req.body)
      res.status(200).end()
    } catch (err) { next(err) }
  }



  return {
    labAllocate,
    allocate,
    deallocate,
  }
}

export default createAllocationController;
