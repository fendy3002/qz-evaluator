const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let entryOutput = {
    entry: {
        "index": path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].min.js",
    }
};
module.exports = merge(common, {
    ...entryOutput,
    mode: 'production',
})