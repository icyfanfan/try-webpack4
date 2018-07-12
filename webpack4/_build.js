/**
 * 预发布、线上环境构建配置：
 * 打包压缩 混淆
 * css文件独立抽取 压缩
 * 文件名加上内容md5
 */
// @UPDATED
const mode = 'production';

const path = require('path');
const webpack = require('webpack');
// css压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// js压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const rm = require('rimraf')
const merge = require('webpack-merge')
const generateBase = require('./_base.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 获取路径配置
const config = require('./_config.js')

const webpackConfig = {
	output: {
		path: path.resolve(__dirname, config.distPath),
		publicPath: config.publicPath,
		filename: 'js/[name].[chunkhash:8].js?',
		chunkFilename: 'js/chunks/[name].[chunkhash:8].js'
	},
	// @UPDATED
	// 指定webpack构建环境，使用对应的内建优化策略	
	// Provides process.env.NODE_ENV with value production. Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin.
	// https://webpack.js.org/concepts/mode/
	mode,
	optimization: {
		// @UPDATED
		// planA production时把所有entry的runtime信息抽取到一个文件
		// planB 或根据入口每个入口的runtime信息抽取到一个文件
		// 按照每个入口独立的角度planB更好
		runtimeChunk: {
			name: entrypoint => `manifest~${entrypoint.name}`
		},
		// @UPDATED
		// mode:production下将默认压缩，这个配置项将会覆盖默认压缩策略
		minimizer: [
			// 配置UglifyJsPlugin压缩js文件
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			// 配置css文件压缩
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					discardComments: {
						removeAll: true
					},
					// 避免 cssnano 重新计算 z-index
					safe: true
				},
				canPrint: false
			})
		]
	},
	plugins: [
		// 当一个chunk变更时不会引起其他chunk id变更
		new webpack.HashedModuleIdsPlugin()
	]
}
// merge config
const buildConfig = merge(generateBase(Object.assign({
	mode
}, config)), webpackConfig)

// 删除上一次构建结果
rm(path.resolve(__dirname, config.distPath), err => {
	if (err) throw err
	webpack(buildConfig, function (err, stats) {
		if (err) {
			throw err
		}
		console.log('Build complete')
	})
})