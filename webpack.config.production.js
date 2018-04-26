module.exports = {
    entry:[
        './src/index.tsx'
    ],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: [ '.js', '.jsx','.ts','.tsx','.css']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            { test: /\.woff2?$/,
                // Inline small woff files and output them below font/.
                // Set mimetype just in case.
                loader: 'url-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 100000,
                    mimetype: 'application/font-woff',
                },
            },
            {
                test: /\.(ttf|svg|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 100000
                },
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { test: /\.tsx?$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/}
        ]
    }
};