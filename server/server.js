let express = require('express');
let app = express();
let path = require('path');
let Handler = require('./handlers.js');
let _data = require('./data.js');

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', function(req, res) {
  let { json, file } = req.body;
  console.log('TCL: json', json);
  json = JSON.parse(json);
  console.log('TCL: json', json);

  let handler = new Handler();

  handler.process(json, (err, filePath) => {
    if (!err) {
      // res.download(filePath);
      // res.attachment(filePath);
      res.sendFile(filePath);
    }
  });
});

app.get('/downloadFile', (req, res) => {});

app.get('/readFiles', (req, res) => {
  _data.readAll((err, files) => {
    if (!err) {
      res.status(200).send(files);
    } else {
      res.status(400);
    }
  });
});

let port = 3000;
app.listen(port, () => {
  console.log('Listening on port ', port);
});
