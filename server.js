'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

const params = [1,2,3,4];

const app = express();

const { extractData, buildResponse } = require('./functions.js');

app.get('/', (req,res) => {

  let resToFront = {
    "error": true
  }

  try {
    let extractedData = extractData(req.query);
    resToFront = buildResponse(extractedData);
  } catch (err) {
    resToFront.message = err;
  }

  console.log(resToFront)

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(resToFront);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
