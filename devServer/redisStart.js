/**
 * Redis 数据库存储读取
 */

const redis = require("redis");

//  client = redis.createClient(6379, 'r-2ze0qr9700vefxsgwc.redis.rds.aliyuncs.com', {detect_buffers: true});  //专有网络
client = redis.createClient(6379, 'r-2ze0qr9700vefxsgwcpd.redis.rds.aliyuncs.com', { detect_buffers: true });  //公网访问
client.auth("adminP@ssw0rd", redis.print)

// 写入数据
//  client.set("key", "this is base");
//  client.set("key1", "this is first OK");
//  client.set("key2", "this is second OK");
//  // 获取数据，返回String
client.get("key", function (err, reply) {
  if (err) { console.log("err:", err) }
  console.log(reply.toString()); // print `OK`
});

client.get("key1", function (err, reply) {
  if (err) { console.log("err:", err) }
  console.log(reply.toString()); // print `OK`
});

client.get("key2", function (err, reply) {
  if (err) { console.log("err:", err) }
  console.log(reply.toString()); // print `OK`
});
