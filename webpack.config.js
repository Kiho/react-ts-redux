var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('es6-promise').polyfill();

module.exports = {
    entry: './src/main.tsx',
    output: {
        filename: 'server/public/dist/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: { // Fix issue with Invariant Violation: addComponentAsRefTo(...)
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ['', '.Webpack.js', '.web.js', '.ts', '.js', '.tsx']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css-loader!sass-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/bundle.css', {
            allChunks: true
        })
    ]
}