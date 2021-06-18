/**
 * AppID: wxd8b26f08f2550ad5
 * AppSecret: 661128d2a1a891c93b661b177a5ad00b
 * 用户唯一标识 OpenID
 * https://api.weixin.qq.com/sns/jscode2session?appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b&js_code=JSCODE&grant_type=authorization_code
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b
 */

const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');
const app = express()
const AppID = 'wxd8b26f08f2550ad5'
const AppSecret = '661128d2a1a891c93b661b177a5ad00b'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test', function (req, res) {
  console.log("get request test")
  res.send('Hello World!')
})

app.post("/login", async (req, res) => {
  try {
    console.log("post login req:", req.body)
    const { js_code, appId } = req.body;
    if (!js_code) throw { "msg": "can not get appId!" }
    let wxSessionInfo = await wxLogin({ js_code })
    const { data, config, status, statusText } = wxSessionInfo
    if (status !== 200) throw new Error({ code: status, msg: statusText })
    const { errcode, errmsg } = data
    if (errcode) throw new Error({ code: errcode, msg: errmsg })
    res.send(data)
  } catch (err) {
    res.send(err)
  }
})
app.get("/login", async (req, res) => {
  try {
    console.log('get login req:', req.query)
    const { js_code, appId } = req.query
    if (!js_code) throw { msg: "can not get appId!" }
    let wxSessionInfo = await wxLogin({ js_code })
    const { data, config, status, statusText } = wxSessionInfo
    if (status !== 200) throw new Error({ code: status, msg: statusText })
    const { errcode, errmsg } = data
    if (errcode) throw new Error({ code: errcode, msg: errmsg })
    res.send(data)
  } catch (err) {
    res.send(err)
  }
})

app.listen(3000)
console.log("service start")
function authRoute(params) {

}

async function wxLogin(params) {
  const { js_code } = params
  return axios.get(`https://api.weixin.qq.com/sns/jscode2session`, {
    params: {
      appid: AppID,
      secret: AppSecret,
      js_code,
      grant_type: 'authorization_code'
    }
  })
}
/**
 * 服务端登录 
 * @returns Promise
 */
async function wxServerLogin() {
  return axios.get(`https://api.weixin.qq.com/cgi-bin/token`, {
    params: {
      grant_type: 'client_credential',
      appid: 'wxd8b26f08f2550ad5',
      secret: '661128d2a1a891c93b661b177a5ad00b'
    }
  })
}

class Error {
  code = null
  msg = null
  constructor (status) {
    this.code = status.code || status.status
    this.msg = status.msg
  }
}

// axios.get(`https://api.weixin.qq.com/cgi-bin/token`, {
//   params: {
//     grant_type: 'client_credential',
//     appid: 'wxd8b26f08f2550ad5',
//     secret: '661128d2a1a891c93b661b177a5ad00b'
//   }
// }).then(res => {
//   if (res.status !== 200) { console.log(`request error: ${res.status}`) }
//   if (res.data.errcode) { const { errcode, errmsg } = res.data; throw { errcode, errmsg } }
//   const { access_token, expires_in } = res.data
//   console.log("axios-format-data:", { access_token, expires_in })
// }).catch(err => {
//   console.log("axios-format-err:", err)
// })

// axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b')
//   .then(res => {
//     if (res.status !== 200) { console.log(`request error: ${res.status}`) }
//     console.log("data1:", res.data)
//   })
//   .catch(err => {
//     console.log("axios-error:", err)
//   })
