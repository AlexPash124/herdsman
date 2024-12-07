const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts', // Вхідний файл
    output: {
        filename: 'bundle.js', // Ім'я згенерованого JS файлу
        path: path.resolve(__dirname, 'dist'), // Куди зберігати файли
        clean: true, // Очищує dist перед бандлом
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Використовує ваш HTML файл як шаблон
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        hot: true,
    },
};
