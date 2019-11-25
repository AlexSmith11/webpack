const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const jsFiles = glob.sync('assets/js/pages/*.js');
const scssFiles = glob.sync('assets/scss/pages/*.scss');
const mapFilesToEntryObject = function (files, prefix) {
    const entries = {};
    files.forEach(function (file) {
       const fileName = file.split('/').pop();
       const [name] = fileName.split('.', 2);

       entries[`${prefix}/${name}`] = './' + file;
    });

    return entries;
};

module.exports = {
    entry: Object.assign(mapFilesToEntryObject(jsFiles, 'js'), mapFilesToEntryObject(scssFiles, 'css')),
    output: {
        path: `${__dirname}/assets/build`,
        publicPath: '/assets/build/',
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        emitFile: true,
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: '/assets/build/images'
                    }
                }],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        emitFile: true,
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '/assets/build/fonts'
                    }
                }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    watchOptions: {
        poll: 1000
    }
};
