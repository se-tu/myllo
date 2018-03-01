const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')

const myframe = require('./myframe')

const app = myframe()

app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/views'))
app.set('actionHelpers', path.join(__dirname, '/util/actionHelpers'))
app.set('viewHelpers', path.join(__dirname, '/util/viewHelpers'))

require('./routers')(app)

app.use(function (req, res) {
  res.render('errors/404', {info: ' /** very important information'})
})

http.createServer(app).listen(3000)