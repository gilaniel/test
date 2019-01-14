const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

const pathModules = path.resolve(__dirname);

module.exports = {
	context: path.resolve(__dirname),
	entry: {
		App: './index.js',
	},
	output: {
		path: path.resolve(__dirname, './static/'),
		filename: '[name].js',
		library: '[name]',
		publicPath: '/static/',
		chunkFilename: '[name].js'
	},
	watch: true,
	mode: 'development',
	resolve: {
		modules: [pathModules,'node_modules']
	},  
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: {
					loader: 'babel-loader',
					options: {
							plugins: ['syntax-dynamic-import']
					}
				}
			},
			{ 
				test: /\.hbs$/,
				use: {
					loader: 'handlebars-loader'
				}
			},
			{ 
				test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
		]
    },
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /node_modules/,
							chunks: "initial",
							name: "vendor",
							priority: 10,
							enforce: true
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.css',
				chunkFilename: '[id].css',
			})
		],
	devtool: 'source-map'
};
