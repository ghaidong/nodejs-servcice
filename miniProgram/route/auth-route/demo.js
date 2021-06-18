axios.get(`https://api.weixin.qq.com/cgi-bin/token`, {
  params: {
    grant_type: 'client_credential',
    appid: 'wxd8b26f08f2550ad5',
    secret: '661128d2a1a891c93b661b177a5ad00b'
  }
}).then(res => {
  if (res.status !== 200) { console.log(`request error: ${res.status}`) }
  if (res.data.errcode) { const { errcode, errmsg } = res.data; throw { errcode, errmsg } }
  const { access_token, expires_in } = res.data
  console.log("axios-format-data:", { access_token, expires_in })
}).catch(err => {
  console.log("axios-format-err:", err)
})

axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8b26f08f2550ad5&secret=661128d2a1a891c93b661b177a5ad00b')
  .then(res => {
    if (res.status !== 200) { console.log(`request error: ${res.status}`) }
    console.log("data1:", res.data)
  })
  .catch(err => {
    console.log("axios-error:", err)
  })
