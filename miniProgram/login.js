/**
 * AppID: wxd8b26f08f2550ad5
 * AppSecret: 661128d2a1a891c93b661b177a5ad00b
 */

const express = require('express')
const app = express()

app.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b', function (req, res) {
  console.log("req:",req)
  res.send('Hello World')
})

//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

app.listen(3000)