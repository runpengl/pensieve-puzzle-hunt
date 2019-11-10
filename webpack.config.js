const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './web/index.js',
        blind: './web/blind/index.js',
        penultima: './web/penultima/index.js',
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'src/main/resources/assets')
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'web/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'blind.html',
            template: 'web/index.html',
            chunks: ['blind'],
        }),
        new HtmlWebpackPlugin({
            filename: 'penultima.html',
            template: 'web/index.html',
            chunks: ['penultima'],
        }),
    ],

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                include: [path.resolve(__dirname, 'web')],
                loader: 'babel-loader',
                options: {
                    plugins: ['syntax-dynamic-import', '@babel/plugin-proposal-class-properties'],
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },

    devServer: {
        open: true,
        hot: true
    }
};

