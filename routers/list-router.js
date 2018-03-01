const listRouter = require('../myframe/router')()
const lists = require('../models/lists')

listRouter.get('/', (req, res) => {
  lists.findAll()
    .then(data => data.map(item => item.dataValues))
    .then(data => res.json(data))
})

listRouter.post('/', (req, res) => {
  lists.create({
    header: req.body.header,
    position: req.body.position,
    bordId: req.body.bordId
  })
    .then(data => res.end(JSON.stringify(data)))
})

listRouter.put('/', (req, res) => {
  lists.update(
    {
      header: req.body.header,
      position: req.body.position,
      bordId: req.body.bordId
    },
    {where: {id: req.body.id}})
    .then(data => res.end(JSON.stringify(data)))
})

listRouter.delete('/', (req, res) => {
  lists.destroy({where: {id: req.body.id}})
    .then(data => res.end(JSON.stringify(data)))
})

module.exports = listRouter