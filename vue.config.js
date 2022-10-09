/**
 * build config
 */

const webpack = require('webpack');
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const name = JSON.parse(packageJson).name || 0;

module.exports = {
	publicPath: '', // removes leading-slash from linked sources in build
	lintOnSave: 'warning', // so the build can still succeed
    devServer: {
        port: 9001
    },
	configureWebpack: {
		plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + name + ' v' + version + '"'
                }
            })
        ]
	}
}
