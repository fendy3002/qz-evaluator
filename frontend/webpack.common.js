const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const sourceCodes = [{
    entry: {
        "qz_evaluator_dom": path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'public/js/bin'),
        library: 'QzEvaluatorDom',
        filename: "[name].js",
    }
}];

let webpackModule = {
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                resolve: {
                    extensions: [".tsx", ".ts", ".js"]
                },
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-typescript",
                                ['@babel/preset-env', { modules: false }]
                            ],
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Capture eot, ttf, woff, and woff2
                test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            },
            {
                test: /\.(jpg|gif|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            }
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
}

module.exports = webpackModule;

// module.exports = sourceCodes.map(sc => {
//     return {
//         ...sc,
//         ...webpackModule
//     }
// });