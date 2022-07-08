const path = require('path');

module.exports = {
    mode:'development',
    entry:{
        main : './src/main.js',
        module1:'./src/module1.js'
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean:true
    },
    devtool:'source-map'
}