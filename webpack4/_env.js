// 根据构建mode
// 获取并合并对应.env .env.{mode}.local文件的配置
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const paths = {
  dotenv: resolveApp('.env')
};

// 收集 NODE_ENV and APP_* 环境变量 之后 准备在webpack配置中通过DefinePlugin把他们注入到应用中
const APP = /^APP_/i;

// @NOTE 改成参数获取production.env.NODE_ENV
function getClientEnvironment(mode) {
  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  var dotenvFiles = [
    `${paths.dotenv}.${mode}.local`,
    `${paths.dotenv}.${mode}`,
    `${paths.dotenv}.local`,
    paths.dotenv,
  ].filter(Boolean);

  // 从.env*文件中加载环境变量. 文件不存在则忽略.
  // 如果已经存在环境变量，则dotenv不会覆盖它，会忽略设置.
  // .env配置文件支持变量展开（类似定义变量，有计算功能）.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile,
        })
      );
    }
  });
  const raw = Object.keys(process.env)
    .filter(key => APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      }, {}
      // @NOTE 不需要
      // {
      //   NODE_ENV: process.env.NODE_ENV || 'development',
      // }
    );
  // 需要Webpack DefinePlugin注入的环境变量，我们需要Stringify下
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return {
    raw,
    stringified
  };
}

module.exports = getClientEnvironment;