const path = require('path');

module.exports = {
    entry: {
        'prompt-loader': [`./mod.js`],
    },
    output: {
        path: path.join(__dirname, '/umd'),
        publicPath: '/umd',
        filename: `[name].min.js`,
        libraryTarget: 'umd',
        globalObject: 'this',
    }
}