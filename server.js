'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

const params = [1,2,3,4];

const app = express();

app.get('/', (req,res) => {

  let r = {
    "error": false,
    "data": {},
    "total": 0
  }

  let data = {}
  let total = 0;

  params.forEach(id => {
    let att = req.query['attendance_'+id];
    r.data[req.query['item_'+id]] = att;
    r.total+=parseInt(att);
  });

  console.log(r)

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(r);
});

app.listen(PORT, HOST);
console.log('Running on http://${HOST}:${PORT}');
