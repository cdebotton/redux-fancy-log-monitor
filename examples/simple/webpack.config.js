var webpack = require("webpack");
var fs = require("fs");
var path = require("path");

var externals = fs.readdirSync(path.join(__dirname, "node_modules"))
  .reduce(function (memo, dir) {
    if ([".bin"].indexOf(dir) > -1) {
      memo[dir] = dir;
    }
    return memo;
  });

var publicPath = "http://localhost:3001/";

module.exports = {
  externals: externals,
  resolve: {
    alias: {
      "react": path.join(__dirname, "../../node_modules/react")
    },
    extensions: ["", ".js"]
  },
  entry: {
    bundle: [
      "webpack-dev-server/client?" + publicPath,
      "webpack/hot/only-dev-server",
      path.join(__dirname, "index.js")
    ]
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: publicPath,
    filename: "[hash].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "react-hot!babel?optional=runtime&stage=0"
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        NODE_ENV: process.env.NODE_ENV || "development",
        BROWSER: true
      })
    }),
    function() {
      this.plugin("done", function(stats) {
        var json = stats.toJson();
        var chunk = json.assetsByChunkName["bundle"];

        if ({}.toString.call(chunk) !== "[object Array]") {
          chunk = [chunk];
        }

        var stats = chunk.filter(function(chunk) {
          return [".js", ".css"].indexOf(path.extname(chunk)) > -1;
        }).reduce(function(stats, chunk) {
          var ext = path.extname(chunk).match(/\.(.+)$/)[1];
          stats[ext] = stats[ext] || [];
          stats[ext].push(publicPath + chunk);

          return stats;
        }, {js: [], css: []});

        fs.writeFileSync(
          path.join(__dirname, "webpack-stats.json"),
          JSON.stringify(stats)
        );
      });
    }
  ]
};
