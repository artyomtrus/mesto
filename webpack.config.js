const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: { main: './src/scripts/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.[contenthash].js',
		publicPath: '',
		clean: true,
	},
	mode: 'development',
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }),
	new MiniCssExtractPlugin()],

	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		open: true,
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: '/node_modules/'
		},
		{
			test: /\.css$/i,
			use: [MiniCssExtractPlugin.loader, {
				loader: 'css-loader',
				options: { importLoaders: 1 }
			},
				'postcss-loader']
		},
		{
			test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
			type: 'asset/resource'
		}]
	}
};