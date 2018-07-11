/**
 * Created by panyz on 2018/5/29.
 */
const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    return config;
};