const path = require('path');

module.exports = {
    mode: "production",
    devtool: "eval-source-map",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public'),
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};