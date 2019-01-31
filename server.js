let express = require('express');
let app = express();
// let parser = require('body-parser');
let path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = 3000;
app.listen(port, () => {
  console.log('Listening on port ', port);
});
