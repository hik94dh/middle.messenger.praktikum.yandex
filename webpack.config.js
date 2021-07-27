const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: ['./src/routes/index.ts', './src/styles/index.scss'],
	output: {
		path: path.resolve(__dirname + '/build/'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json'),
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.hbs/,
				loader: 'handlebars-loader',
				exclude: /(node_modules)/,
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, '/build/'),
		compress: true,
		port: 4000,
		hot: true,
		open: false,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './static/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
	],
};
