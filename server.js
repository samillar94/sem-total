'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

const app = express();

const { extractData, buildResults } = require('./functions.js');

app.get('/', (req,res) => {

  let results = {
    "error": true
  }

  try {
    let extractedData = extractData(req.query);
    results = buildResults(extractedData);
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
