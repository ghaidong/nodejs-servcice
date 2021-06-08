/**
 * OSS 文件读取
 */

// AccessKey ID
// LTAI5tQfBgsiKUrkN6vfTWqj
// AccessKey Secret
// pXSeD9WJTR9FGHL1DGTZTZrfoxUGlR

let OSS = require('ali-oss');
const fs = require('fs');

let client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tQfBgsiKUrkN6vfTWqj',
  accessKeySecret: 'pXSeD9WJTR9FGHL1DGTZTZrfoxUGlR',
  bucket: 'visualstreet-data',
});

// list();
getOssFile();
async function getOssFile() {
  try {
    let result = await client.get('examplepath/a/20210531.txt');
    console.log("result buffer:",result.content);
    console.log("result content string:", result.content.toString())
    return result.content.toString()
  } catch (e) {
    console.log(e);
    return null
  }
}

async function list() {
  // 不带任何参数，默认最多返回100个文件。
  let result = await client.list();
  console.log(result);
}

