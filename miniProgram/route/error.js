class Error {
  code = null
  msg = null
  constructor (status) {
    this.code = status.code || status.status
    this.msg = status.msg
  }
}

module.exports = Error