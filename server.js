const { Client } = require('node-postgres');

(async () => {
  const client = new Client({
    user: 'haidong',
    host: 'pgm-2ze87jav772u2v82jo.pg.rds.aliyuncs.com',
    database: 'tolerance',
    password: 'adminP@ssw0rd',
    port: 1921
  });

  await client.connect();

  const res = await client.query('SELECT * from fruit_user');
  // const res = await client.query("INSERT INTO fruit_user VALUES (1,'test', clock_timestamp() , clock_timestamp(),'2')")
  console.log(res.rows);
  await client.end();
})().catch(console.error);