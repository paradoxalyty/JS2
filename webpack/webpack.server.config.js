const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        server: path.join(__dirname, 'src/server/server.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: "server/[name].js"
    },
    target: 'node',
    node: {
        //Только для express
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                // js - компиляция ES6+ в ES5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'src/server/db',
                to: 'server/db/[name].[ext]',
                toType: 'template'
            }
        ])
    ]
};