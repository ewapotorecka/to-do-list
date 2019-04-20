const photo = document.getElementById( 'photos' );
const photoArr = ['zdjecia/DSC07256 (1).JPG']

function randomizePhoto( array ) {
	const index = Math.floor( Math.random() * array.length );
	return array[ index ];
}

function viewPhoto() {
	const photo = document.createElement( 'DIV' );
	photo.id = 'photo';
	photo.innerText = randomizePhoto( photoArr );
	
}