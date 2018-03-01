const db = require('./base_models/')
const Lists = require('./lists')

class Cards extends db.cards {

  static getOwnerId (id) {
    return super.find({
      where: {id},
      include: {
        model: db.lists,
        include: {
          model: db.bords,
          include: db.users
        }
      }
    })
      .then( data => data.list.bord.user.id)
  }
}

module.exports = (() => {

  db.cards.belongsTo(db.lists)

  return Cards
})()