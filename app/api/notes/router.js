const controller = require('./controller')
const auth = require('./auth')

module.exports = (router) => {
  router.get('/user/:id/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.listByUser(req, res)
  })
}
