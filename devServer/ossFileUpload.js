// AccessKey ID
// LTAI5tQfBgsiKUrkN6vfTWqj
// AccessKey Secret
// pXSeD9WJTR9FGHL1DGTZTZrfoxUGlR

const OSS = require('ali-oss')
const fs = require('fs')
const path = require("path")

let folder = fs.readdirSync('./assets')
let filePath = path.normalize('./assets/currentExample.txt')
console.log("folder:", folder)
console.log("filePath:", filePath)

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: 'LTAI5tQfBgsiKUrkN6vfTWqj',
  accessKeySecret: 'pXSeD9WJTR9FGHL1DGTZTZrfoxUGlR',
  // 填写Bucket名称。
  bucket: 'visualstreet-data',
});

async function put() {
  try {
    // 填写Object完整路径和本地文件的完整路径。Object完整路径中不能包含Bucket名称。
    // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    let result = await client.put('example001.txt', filePath);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

put();
