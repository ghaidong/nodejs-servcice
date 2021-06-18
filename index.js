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

app.post("/login", async (req, res)=>{
  try {
    console.log("post login req:", req.body)
    const { js_code, appId } = req.body;
    if (!js_code) throw { "msg":"can not get appId!"}
    const wxSessionInfo = await wxLogin({ jsCode})
    console.log("wxSessionInfo:", wxSessionInfo)
    // res.end(JSON.stringify(req.body))
  } catch(err){
    console.log("post login err:", err)
  }
})
app.get("/login", async (req, res) => {
  try {
    console.log('login req:', req.query)
    const { js_code, appId } = req.query
    if(!js_code) throw {msg:"can not get appId!"}
    return
    const wxSessionInfo = await wxLogin()
    console.log("login wx success:", wxSessionInfo.data)
    res.send(JSON.stringify(wxSessionInfo.data))
  } catch (err) {
    console.log(`Faile to login: ${err}`)
  }
})

app.listen(3000)
console.log("service start")

async function wxLogin(params) {
  const { js_code } = params
  return axios.get(`https://api.weixin.qq.com/sns/jscode2session`, {
    appid: AppID,
    secret: AppSecret,
    js_code,
    grant_type: 'authorization_code'
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
