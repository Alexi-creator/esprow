const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, '..', 'src/components'),
			'@stubs': path.resolve(__dirname, '..', 'src/stubs'),
		},
		extensions: ['.tsx', '.ts', '.js', 'json'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]__[sha1:hash:hex:7]',
							},
						},
					},
					{
            loader: "sass-loader",
            options: {
              api: "modern",
            },
          },
					'postcss-loader',
				],
			},
			{
				test: /^((?!\.module).)*s(a|c)ss$/,
				use: [
					process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
					'css-loader',
					{
            loader: "sass-loader",
            options: {
              api: "modern",
            },
          },
					'postcss-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	output: {
		path: path.resolve(__dirname, '..', './build'),
		filename: '[name].[chunkhash].js',
		clean: true,
		assetModuleFilename: 'assets/images/[name][ext]',
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', './public/index.html'),
			favicon: path.resolve(__dirname, '..', './public/favicon.ico'),
		}),
		new MiniCssExtractPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '..', './public'),
					to: '',
					globOptions: {
						ignore: ['**/index.html'],
					},
				},
			],
		}),
	],
	stats: 'errors-only',
};
