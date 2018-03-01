let bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const userRouter = require('../myframe/router')()
const users = require('../models/users')



userRouter.post('/register', (req, res) => {

  let {email, password} = req.body
  let password_hash = bcrypt.hashSync(password, 15)

  let newUser = {
    email,
    password_hash
  }

  users.create(newUser)
    .then(user => {
      user.password_hash = undefined
      res.json(user)
    })
    .catch(err => res.json(err))

})

userRouter.post('/login', (req, res) => {
  let {email, password} = req.body

  users.findOne({where: {email}})
    .then(user => {
      if (!bcrypt.compareSync(password, user.password_hash)) {
        res.json({message: 'Authentication failed. Wrong password.'})
      }
      const token = jwt.sign({userId: user.id }, 'secret', { expiresIn: '1h' })
      res.setHeader('Authorization', 'JWT ' + token)
      res.json('ok')
    })
    .catch(err => res.json(err))
})

userRouter.post('/refresh_token', (req, res) => {

  let token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, 'secret', (err, verifiedJwt) => {

    if(err) res.json(err)

    const token = jwt.sign({userId: verifiedJwt.userId}, 'secret', { expiresIn: '1h' })
    res.setHeader('Authorization', 'JWT ' + token)
    res.json(verifiedJwt)
  })
})

userRouter.post('/logout', (req, res) => {

})

userRouter.post('/test', (req, res) => {


  // let token = req.headers.authorization.split(' ')[1]
  //
  // jwt.verify(token, 'secret', (err, verifiedJwt) => {
  //
  // //  verifiedJwt.exp += 60*60
  //   res.json(err||verifiedJwt)
  // })



 cards.getOwnerId(2)
   .then( data => res.json(data.list.bord.user.id))
})

module.exports = userRouter