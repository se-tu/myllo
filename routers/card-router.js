const cardRouter = require('../myframe/router')()
const cards = require('../models/cards')
const middleware = require('../auth/middleware')

cardRouter.get('/', middleware.isLoggedIn, (req, res) => {
  cards.findAll()
    .then(data => data.map(item => item.dataValues))
    .then(data => res.end(JSON.stringify(data)))
})

cardRouter.post('/', middleware.isLoggedIn, (req, res) => {
  cards.create({
    name: req.body.name,
    description: req.body.description,
    position: req.body.position,
    listId: req.body.listId,
    ownerId: req.user.id
  })
    .then(data => res.end(JSON.stringify(data)))
})

cardRouter.put('/', middleware.isLoggedIn, (req, res) => {
  cards.update(
    {
      name: req.body.name,
      description: req.body.description,
      position: req.body.position,
      listId: req.body.listId
    },
    {where: {id: req.body.id}})
    .then(data => res.end(JSON.stringify(data)))
})

cardRouter.delete('/',middleware.isLoggedIn,  (req, res) => {
  cards.destroy({where: {id: req.body.id}})
    .then(data => res.end(JSON.stringify(data)))
})

module.exports = cardRouter