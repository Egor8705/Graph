const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry : './public/src/app.jsx',
    
    output: {
          path: __dirname + '/public/js',
          filename: 'bundle.js'
      },
      
    module:{
        loaders:[
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    
    resolve: {
          alias: {
              dist: "node_modules/jquery" 
          },
          modules:[
              "jquery", "node_modules"
          ]
      },

    plugins: [
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              jquery: "jquery"
          })
      ]
};