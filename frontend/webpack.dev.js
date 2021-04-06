const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let entryOutput = {
    entry: {
        "qz_evaluator_dom": path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'public/js/bin'),
        library: 'QzEvaluatorDom',
        filename: "[name].js",
    }
};
module.exports = merge(common, {
    ...entryOutput,
    mode: 'development',
    devtool: 'inline-source-map',
})