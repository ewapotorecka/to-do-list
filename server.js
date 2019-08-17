/* eslint-env node */

const path = require( 'path' );
const express = require( 'express' );
const app = express();
const fs = require( 'fs' );

let categories = {};

if ( fs.existsSync( 'data.json' ) ) {
	categories = JSON.parse( fs.readFileSync( 'data.json' ) );
}

app.use( express.json() );

app.get( '/', ( request, response ) => {
	response.sendFile( path.resolve( 'index.html' ), err => {
		if ( err ) {
			throw err;
		}
	} );
} );

app.get( '/dist/main.js', ( request, response ) => {
	response.sendFile( path.resolve( 'dist/main.js' ), err => {
		if ( err ) {
			throw err;
		}
	} );
} );

app.get( '/api/categories', ( request, response ) => {
	response.json( Object.keys( categories ) );
} );

app.get( '/api/categories/:categoryName', ( request, response ) => {
	const categoryName = request.params.categoryName;

	response.json( categories[ categoryName ] || null );
} );

app.put( '/api/categories/:categoryName', ( request, response ) => {
	const categoryName = request.params.categoryName;
	const tasks = request.body;

	categories[ categoryName ] = tasks;

	saveCategories();

	response.status( 200 ).send( { status: 'ok' } );
} );

function saveCategories() {
	fs.writeFileSync( 'data.json', JSON.stringify( categories, null, '\t' ) );
}

app.listen( 3000, () => {
	console.log( 'Server is listening on port 3000' );
} );

