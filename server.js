'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

const params = [1,2,3,4];

const app = express();

const { extractData, processData } = require('./functions.js');

app.get('/', (req,res) => {

  let results = {
    "error": true
  }

  try {
    let extractedData = extractData(req.query);
    let processedData = processData(extractedData);
    results.data = processedData;
    results.error = false;
  } catch (err) {
    results.message = err;
  }

  console.log(results)

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(results);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
