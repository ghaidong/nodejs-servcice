/**
 * AppID: wxd8b26f08f2550ad5
 * AppSecret: 661128d2a1a891c93b661b177a5ad00b
 * 用户唯一标识 OpenID
 * https://api.weixin.qq.com/sns/jscode2session?appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b&js_code=JSCODE&grant_type=authorization_code
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b
 */

const express = require('express')
const axios = require('axios');
const app = express()
const AppID = 'wxd8b26f08f2550ad5'
const AppSecret = '661128d2a1a891c93b661b177a5ad00b'

app.get("/login", async (req, res) => {
  try {
    console.log('login req:', req)
    const { jsCode, appId } = req.params
    const wxSessionInfo = await wxLogin()
    console.log("login wx success:", wxSessionInfo.data)
    res.send(JSON.stringify(wxSessionInfo.data))
  } catch (err) {
    console.log(`Faile to login: ${err}`)
  }
})


async function wxLogin(req) {
  const { js_code } = req.params
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



app.listen(3000)
console.log("service start")

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
