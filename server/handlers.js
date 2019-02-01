let _data = require('./data');
let os = require('os');

function Lib() {
  this._objects = [];
  this._headers;
}

Lib.prototype.process = function(data, callback) {
  this.parse(data);
  _data.create('csv_report', 'csv', this.combine(), callback);
};

Lib.prototype.combine = function() {
  let data = this._headers.join();

  this.getObjects().forEach((obj) => {
    data += os.EOL + Object.values(obj).join();
  });

  return data;
};

Lib.prototype.setHeaders = function(data) {
  let headers = this.getHeaders();
  if (!headers) {
    this._headers = Object.keys(data);
  }
};

Lib.prototype.parse = function(data) {
  let children = data.children;
  delete data.children;
  this._objects.push(data);

  this.setHeaders(data);

  if (children.length < 1) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    this.parse(child);
  }

  return this.getObjects();
};

Lib.prototype.getHeaders = function() {
  return this._headers;
};

Lib.prototype.getObjects = function() {
  return this._objects;
};

module.exports = Lib;
