const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');
const ImageminPlugin = require('imagemin-webpack');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                comments: false,
                compress: {
                    drop_console: true
                }
            }
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        new FontminPlugin({
           autodetect: true,
        }),
        new ImageminPlugin({
            test: /\.(gif|png|jpe?g|svg)$/i,
            bail: false, // Ignore errors on corrupted images
            cache: false,
            imageminOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    ["svgo",
                        {
                            removeXMLNS: true,
                            cleanupListOfValues: true,
                            removeRasterImages: true,
                            removeDimensions: true,
                            removeAttrs: true,
                            removeAttributesBySelector: true,
                            removeElementsByAttr: true,
                            removeOffCanvasPaths: true,
                            removeStyleElement: true,
                            removeScriptElement: true,
                            reusePaths: true,
                        }
                    ]
                ]
            }
        }),
    ]
});
