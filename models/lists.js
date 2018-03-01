const db = require('./base_models/')
const Cards = require('./cards')

class Lists extends db.lists {


}

module.exports = (() => {

  db.lists.hasMany(db.cards)
  db.lists.belongsTo(db.bords)

  return Lists
})()
