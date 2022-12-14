require("babel-polyfill");
const path = require("path");
const webpack = require("webpack");
const Memoryfs = require("memory-fs");
const compiler = (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "dist/bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: path.resolve(__dirname, "./loaders/errorReportLoader.js"),
            options: {
              identifier: "error",
              catchClause: `window.report(error)`
            }
          }
        }
      ]
    }
  });
  compiler.outputFileSystem = new Memoryfs();
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};

const stats = compiler("src/reportTest.js");

module.exports = compiler