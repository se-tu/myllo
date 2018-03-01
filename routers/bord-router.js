const bordRouter = require('../myframe/router')()
const bords = require('../models/bords')
const middleware = require('../auth/middleware')

bordRouter.get('/', (req, res) => {
  bords.findAll()
    .then(data => data.map(item => item.dataValues))
    .then(data => res.end(JSON.stringify(data)))
})

bordRouter.post('/', (req, res) => {
  bords.create({
    ownerId: req.body.ownerId,
    title: req.body.title
  })
    .then(data => res.end(JSON.stringify(data)))
})

bordRouter.put('/', (req, res) => {
  bords.update(
    {
      ownerId: req.body.ownerId,
      title: req.body.title
    },
    {where: {id: req.body.id}})
    .then(data => res.end(JSON.stringify(data)))
})

bordRouter.delete('/', (req, res) => {
  bords.destroy({where: {id: req.body.id}})
    .then(data => res.end(JSON.stringify(data)))
})

module.exports = bordRouter