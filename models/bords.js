const db = require('./base_models/')

class Bords extends db.bords {

}

module.exports = (() => {

  db.bords.hasMany(db.lists)
  db.bords.belongsTo(db.users, {
    foreignKey: 'ownerId'
  })

  return Bords
})()
