var webpack = require("webpack");
var path = require("path");
var fs = require("fs");

var externals = fs.readdirSync(path.join(__dirname, "node_modules"))
  .reduce(function (memo, dir) {
    if ([".bin"].indexOf(dir) > -1) {
      memo["commonjs2 " + dir] = dir;
    }
    return memo;
  }, {});

module.exports = {
  externals: externals
};
