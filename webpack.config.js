/* eslint-env node */
const path = require( 'path' );

module.exports = {
	entry: path.resolve( 'src/index.ts' ),

	output: {
		path: path.resolve( './dist' ),
		filename: 'main.js'
	},

	devtool: 'source-map',

	resolve: {
		extensions: [ '.ts', '.tsx', '.js' ]
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader'
			}
		]
	}
};
