
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')

module.exports ={
    mode:'development',
    // devtool: 'inline-source-map',
    entry:{
        index:'./index.js',
        other:'./other.js'
        // index: {
        //     import: './index.js',
        //     dependOn: 'shared',
        //   },
        //   another: {
        //     import: './other.js',
        //     dependOn: 'shared',
        //   },
        //   shared: 'lodash',
    },
    output:{
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: './',
    },
    devServer: {
        static: './dist',
        port:8080
    },
    optimization:{
        runtimeChunk:'single',
        // moduleIds: 'deterministic',
        splitChunks: {
        //     chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins:[
        new HtmlWebpackPlugin({title:'111',template: './index.html'}),
        // new BundleAnalyzerPlugin()
    ]
}