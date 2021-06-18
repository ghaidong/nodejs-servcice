/**
 * AppID: wxd8b26f08f2550ad5
 * AppSecret: 661128d2a1a891c93b661b177a5ad00b
 * 用户唯一标识 OpenID
 * https://api.weixin.qq.com/sns/jscode2session?appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b&js_code=JSCODE&grant_type=authorization_code
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b
 */

// import { Error } from "../error";
// import { AUTH } from "../../config"

const Error = require('../error')
const axios = require('axios');
const AppID = 'wxd8b26f08f2550ad5'
const AppSecret = '661128d2a1a891c93b661b177a5ad00b'


/**
 * app express app
 */
const authRoute = function(app) {
  app.get("/test", async(req,res)=>{
    res.send("Hello login test\nthis is for 3000")
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
}
module.exports = authRoute

/**
 * wx login
 * @param {*} params 
 * @returns 
 */
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
 * 服务端API登录 
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

