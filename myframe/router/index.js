const actionHelpers = require('../../util/actionHelpers')

class Router {

  // _handleError (res) {
  //   res.statusCode = 404
  //   res.render('404')
  // }
  _formatUrl (url) {
    let paramsInUrl = []

    url.split('/:')
      .map(v => v.split('/')[0])
      .filter(v => v.length > 0)
      .map(el => {
        paramsInUrl.push(el)
        url = url.replace(':' + el, '[^/]+')
      })

    return {url, paramsInUrl}
  }

  constructor () {
    this.handlers = {}
  }

  setHandler (method, url, handler) {
    let {url: updatedUrl, paramsInUrl: params} = this._formatUrl(url)

    if (!this.handlers[updatedUrl]) {
      this.handlers[updatedUrl] = {}
    }

    this.handlers[updatedUrl][method] = {params, handler}
  }

  handleRequest (req, res, next) {
    let {method, url} = req

    method = method.toLowerCase()

    let urlHandler = this.handlers[url]

    if (urlHandler && urlHandler[method]) {
      urlHandler[method].handler(req, res, next)
      return

    }

    for (let handlerUrl in this.handlers) {
      if (url.match(new RegExp('^' + handlerUrl + '$'))) {
        let handlerObject = this.handlers[handlerUrl][method]

        if (handlerObject) {
          let paramsValues = []

          handlerUrl.split('[^/]+').map(el => {
            let v = url.split(el)[1]
            url = url.replace(v + el, '')

            paramsValues.push(v)
          })

          let keys = handlerObject.params

          if (!req.params) {
            req.params = {}
          }

          for (let i = 0; i < keys.length; i++) {
            req.params[keys[i]] = paramsValues[i]
          }
          handlerObject.handler(req, res, next)
          return
        }
      }
    }
    next()
  }

}

module.exports = () => {
  const router = new Router()

  return {
    get: router.setHandler.bind(router, 'get'),
    post: router.setHandler.bind(router, 'post'),
    put: router.setHandler.bind(router, 'put'),
    delete: router.setHandler.bind(router, 'delete'),

    handler: router.handleRequest.bind(router),
    helpers: actionHelpers
  }
}
