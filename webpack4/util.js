const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 获取指定目录下符合glob的所有文件
exports.getEntry = function (globPath) {
  var files = glob.sync(globPath);
  var entries = {},
    baseName, extName;
  files.forEach((entry) => {
    extName = path.extname(entry);
    baseName = path.basename(entry, extName);
    entries[baseName] = [entry];
  })
  return entries;
}

// @DEPRECATED
// copyfrom vue-cli配置，vue-loader的options生成函数，
// exports.cssLoaders = function (options) {
//     options = options || {}

//     var cssLoader = {
//       loader: 'css-loader',
//       options: {
//         minimize: options.build
//         // sourceMap: options.sourceMap
//       }
//     }

//     // generate loader string to be used with extract text plugin
//     function generateLoaders (loader, loaderOptions) {
//       var loaders = [cssLoader]
//       if (loader) {
//         loaders.push({
//           loader: loader + '-loader',
//           options: Object.assign({}, loaderOptions, {
//             sourceMap: options.sourceMap
//           })
//         })
//       }

//       // @UPDATED 更换使用miniCssExtractPlugin
//       // Extract CSS when that option is specified
//       // (which is the case during production build)
//       // if (options.extract) {
//       //   return ExtractTextPlugin.extract({
//       //     use: loaders,
//       //     fallback: 'vue-style-loader'
//       //   })
//       // } else {
//       return ['vue-style-loader'].concat(loaders)
//       // }
//     }

//     // https://vue-loader.vuejs.org/en/configurations/extract-css.html
//     return {
//       css: generateLoaders(),
//       postcss: generateLoaders(),
//       less: generateLoaders('less'),
//       sass: generateLoaders('sass', { indentedSyntax: true }),
//       scss: generateLoaders('sass', {
//         includePaths:['src/static/scss']
//       }),
//       stylus: generateLoaders('stylus'),
//       styl: generateLoaders('stylus')
//     }
//   }

//   // Generate loaders for standalone style files (outside of .vue)
// exports.styleLoaders = function (options) {
//   const output = []
//   const loaders = exports.cssLoaders(options)
//   for (const extension in loaders) {
//     const loader = loaders[extension]
//     output.push({
//       test: new RegExp('\\.' + extension + '$'),
//       use: loader
//     })
//   }
//   return output
// }