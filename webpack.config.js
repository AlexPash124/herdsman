const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Імпортуємо плагін


module.exports = {
    mode: 'development',
    entry: './src/index.ts', // Вхідний файл
    output: {
        filename: 'bundle.js', // Ім'я згенерованого JS файлу
        path: path.resolve(__dirname, 'dist'), // Куди зберігати файли
        clean: true, // Очищує dist перед бандлом
        assetModuleFilename: 'assets/[name][ext][query]'
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
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset/',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Використовує ваш HTML файл як шаблон
            patterns: [
                { from: path.resolve(__dirname, 'src/assets'), to: 'assets' } // Копіюємо папку assets у dist
            ],
        }),

        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets'), to: 'assets' } // Копіюємо папку assets у dist
            ],
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        hot: true,
    },
};
