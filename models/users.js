const db = require('./base_models/')

class Users extends db.users {


}

module.exports = (() => {

  db.users.hasMany(db.bords, {
    foreignKey: 'ownerId'
  })

  return Users
})()
