const isLoggedIn = (req, res, next) => {

  let token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, 'secret', (err, data) => {
    if(err){
      // redirect to login page
      throw new Error(info.message)
    }
    req.user.id = data.userId
    next()
  })

}

const isOwner = (req, res, next) => {

  isLoggedIn(req, res, () => {
    if (req.user.id!== req.body.ownerId) {
      // redirect to login page
      throw new Error(info.message)

    }
    return next()
  })
}


module.exports = {
  isLoggedIn,
  isOwner
}