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
        new HtmlWebpackPlugin({
            template: './src/components/html/phoneNumbersDoc.html', // Шаблон для страницы авторизации
            filename: 'phoneNumbersDoc.html', // Имя выходного HTML файла
            chunks: ['phoneNumbersDoc'], // Указывает, какие сборки подключать
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            template: './src/components/html/employeeList.html', // Шаблон для страницы авторизации
            filename: 'employeeList.html', // Имя выходного HTML файла
            chunks: ['employeeList'], // Указывает, какие сборки подключать
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            template: './src/components/html/employeeData.html', // Шаблон для страницы авторизации
            filename: 'employeeData.html', // Имя выходного HTML файла
            chunks: ['employeeData'], // Указывает, какие сборки подключать
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