const myLogger = function (req, res, next) {
  console.log('LOGGED:')
  let originalUrl = req.originalUrl
  let method = req.method
  let ip = req.ip
  let host = req.host
  let body = req.body
  let params = req.params 
  console.log({
    ip,
    host,
    originalUrl,
    method,
    body,
    params
  })
  next()
}

module.exports = myLogger