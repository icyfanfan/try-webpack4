/**
 * 开发环境构建配置：
 * 使用webpack-dev-server
 */
// @UPDATED
const mode = 'development';

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server/lib/Server')
const merge = require('webpack-merge')
const generateBase = require('./_base.js')
const path = require('path')
const rm = require('rimraf')

const util = require('./util')


// 获取基础配置
const config = require('./_config.js')


let baseConfig = generateBase({
    mode
});


// @UPDATE调整位置
// 调用generaeBase后才会在process.env上挂参数
const port = parseInt(process.env.PORT, 10) || 8092,
    host = process.env.HOST || '0.0.0.0',
    app_homepage = process.env.APP_HOMEPAGE,
    homepage = app_homepage && app_homepage !== '' ? `/${app_homepage}.html` : '/index.html';

// webpack配置
const webpackConfig = {
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
        publicPath: '/',
    },
    // @NEW
    // 指定webpack构建环境，使用对应的内建优化策略
    // Provides process.env.NODE_ENV with value development. Enables NamedChunksPlugin and NamedModulesPlugin.
    // https://webpack.js.org/concepts/mode/
    mode,
    watch: true,
    plugins: [
        // 开启HMR
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        inline: true,
        disableHostCheck: true,
        hot: true,
        open: true,
        // @NOTE 开启HMR 必须在配置中指定host
        // 否则会报错
        host,
        port,
        disableHostCheck: true,
        stats: {
            colors: true
        },
        historyApiFallback: {
            rewrites: [{
                from: /^\/$/,
                to: homepage,
            }]
        }
    }
}

module.exports = merge(baseConfig, webpackConfig);