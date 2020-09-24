
// access to variables in the configuration
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// entire configuration (as Object)
module.exports = 
{
    entry:['./src/js/index.js'], // vhodyashii main '.js' file
    output: // vivod svyazka 'bundle.js' of .js and etc packages
    {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: // all info creating on server and launch it
    {
        contentBase: './dist'
    },
    plugins: // plugin for creating copy of html
    [
        new HtmlWebpackPlugin (
            { 
                filename: 'index.html',
                template: './src/index.html'
            }
        )
    ],
    module: //loader bundel
    {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};