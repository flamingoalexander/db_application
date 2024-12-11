const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js', // Главная точка входа
        auth: './src/auth.js', // Точка входа для авторизации
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js', // Имя файла соответствует имени точки входа
        clean: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон для главной страницы
            filename: 'index.html', // Имя выходного HTML файла
            chunks: ['main'], // Указывает, какие сборки подключать
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            template: './src/auth.html', // Шаблон для страницы авторизации
            filename: 'auth.html', // Имя выходного HTML файла
            chunks: ['auth'], // Указывает, какие сборки подключать
            inject: 'body',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Псевдоним @ указывает на папку src
        },
        extensions: ['.js', '.json', 'html'], // Какие расширения учитывать при импорте
    },
};