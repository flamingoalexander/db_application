const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: './src/auth.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон HTML
            filename: 'index.html', // Имя выходного файла
            inject: 'body', // Скрипты добавляются перед закрывающим </body>
        }),
        new HtmlWebpackPlugin({
            template: './src/auth.html', // Шаблон HTML
            filename: 'auth.html', // Имя выходного файла
            inject: 'body', // Скрипты добавляются перед закрывающим </body>
        }),
    ],
};