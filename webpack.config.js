const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CSSPlugin = new MiniCssExtractPlugin({
  filename: 'app.css'
});

module.exports = {
  entry: path.join(__dirname, 'src/app.js'),
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'app.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
    	{ test: /\.html$/, loader: 'html-loader' },
      { 
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          { loader: 'string-replace-loader', 
            options: {
              search:'"dist/images/bg', 
              replace:'"images/bg', 
              flags:'g'
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
              outputPath: 'images/',
              publicPath: "dist/images"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    CSSPlugin
  ]
}