/* eslint-env node */
const path = require( 'path' );

module.exports = {
	entry: path.resolve( 'src/index.js' ),

	output: {
		path: path.resolve( './dist' ),
		filename: 'main.js'
	}
};
