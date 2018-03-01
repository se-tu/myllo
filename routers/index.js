const bordRouter = require('./bord-router')
const cardRouter = require('./card-router')
const listRouter = require('./list-router')
const userRouter = require('./user-router')


module.exports = (app) => {

  app.use('/bords', bordRouter.handler)
  app.use('/cards', cardRouter.handler)
  app.use('/lists', listRouter.handler)
  app.use('/', userRouter.handler)

}