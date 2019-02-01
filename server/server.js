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
  json = JSON.parse(json);

  let handler = new Handler();

  handler.process(json, (err, filePath) => {
    if (!err) {
      res.sendFile(filePath);
      // res.download(filePath);
    }
  });
});

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
