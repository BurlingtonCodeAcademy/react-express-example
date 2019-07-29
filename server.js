const express = require('express');
const app = express();
const $path = require('path');
const fs = require('fs');

const port = process.env.PORT || 5000;
const dataPath = $path.resolve('./data')

app.get('/message', (req, res) => {
  // console.log('Requested path: ', req.path);
  const theFile = $path.join(dataPath, 'message.json');
  const data = fs.readFileSync(theFile);
  const json = JSON.parse(data);
  json.date = (new Date()).toLocaleTimeString()
  res.type('json').send(json);
})

app.post('/message',
  express.json(),
  (req, res) => {
    console.log('POST received, body is: ', req.body);
    const theFile = $path.join(dataPath, 'message.json');
    fs.writeFileSync(theFile, JSON.stringify(req.body));
    res.status(201).send('Success');
})

app.listen(port, (req, res) => {
  console.log(`Listening on PORT => ${port}`)
});
