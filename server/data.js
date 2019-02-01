let fs = require('fs');
let path = require('path');

// Container
let lib = {};

// Base Path
lib.baseDir = path.join(__dirname, './.data/');

lib.create = function(file, type, data, callback) {
  let filesLength = fs.readdirSync(lib.baseDir).length;
  let filePath = `${lib.baseDir}${file}_${filesLength + 1}.${type}`;

  fs.open(filePath, 'wx', (err, fd) => {
    if (!err && fd) {
      fs.writeFile(filePath, data, (err) => {
        if (!err) {
          fs.close(fd, (err) => {
            callback(err, filePath);
          });
        }
      });
    } else {
      callback(err, filePath);
    }
  });
};

lib.read = function() {};

lib.readAll = function(callback) {
  fs.readdir(lib.baseDir, callback);
};

lib.update = function() {};

lib.delete = function(file, type = 'csv', callback) {
  let filePath = `${lib.baseDir}${file}.${type}`;
  fs.unlink(filePath, callback(err, filePath));
};

// Export lib Module
module.exports = lib;
