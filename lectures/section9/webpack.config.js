const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    // path: "/home/igor/dev/repositorios/github/basicjavascript/lectures/section9/dist/js",
    filename: "js/bundle.js"
  },
  devServer:{
      contentBase:'./dist'
  },
  plugins :[
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
      })
  ]
//   mode: "development",
};