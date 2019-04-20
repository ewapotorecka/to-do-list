const loveArr = [ 'Kocham Cię!', 'Love love', 'kook', 'lol', 'pokl' ];
const loveStatement = document.getElementById( 'love-statement' );

viewLove();
function randomizeLove( array ) {
	const index = Math.floor( Math.random() * array.length );
	return array[ index ];
}

function viewLove() {
	const love = document.createElement( 'DIV' );
	love.id = 'love';
	love.innerText = randomizeLove( loveArr );
	loveStatement.appendChild( love );
}

