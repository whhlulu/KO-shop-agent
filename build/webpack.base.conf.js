var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
       app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery'),
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {presets: ['es2015']},
                include: [resolve('src'), resolve('test'), resolve("es-2015")]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },

            // {
            //     test: /\.js$/,
            //     loader: "babel-loader",
            //     query: {presets: ['es2015']},
            //     exclude: /node_modules/,
            // }
        ]
    },
    // 增加一个plugins  
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}