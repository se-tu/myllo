const connect = require('connect')
const ejs = require('ejs')
const fs = require('fs')
const viewHelpers = require('../../util/viewHelpers')
module.exports = createApplication

function createApplication(){
  const app = connect()

  app.settings = {}

  app.use( (req, res, next) => {
    res.render = (fileName, options) => {

      let filePath    = app.settings['views'] +  '\\' + fileName + '.ejs'

      fs.readFile(filePath, 'utf-8', (error, content) => {
        if(error) {
          throw new Error('Read file error')
        }

        Object.assign(options, viewHelpers)

        let render = ejs.render(content, options)
        res.end(render)
      })
    }
    res.json = data => res.end(JSON.stringify(data))

    next()
  })

  app.set = function(setting, value){
    app.settings[setting] = value;
  }

  return app
}