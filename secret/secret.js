const yearsButton = document.getElementById( 'button-years' );
const monthsButton = document.getElementById( 'button-months' );
const daysButton = document.getElementById( 'button-days' );
const hoursButton = document.getElementById( 'button-hours' );
const theDate = new Date( '2017-05-01T00:00:00' );


yearsButton.addEventListener( 'click', () => showTime( 31536000000 ) );
monthsButton.addEventListener( 'click', () => showTime( 2628000000 ) );
daysButton.addEventListener( 'click', () => showTime( 86400000 ) );
hoursButton.addEventListener( 'click', () => showTime( 3600000 ) );

function showTime( divider ) {
	const h1 = document.getElementById( 'h1' );

	if ( document.getElementById( 'time' ) ) {
		const time = document.getElementById( 'time' );
		time.remove();
	}
	const time = document.createElement( 'DIV' );
	let timeText = '';
	time.classList.add( 'time-output' );
	time.id = 'time';
	if ( divider == 31536000000 ) {
		timeText = ' lata';
	} else if ( divider == 2628000000 ) {
		timeText = ' miesiące';
	} else if ( divider == 86400000 ) {
		timeText = ' dni';
	} else if ( divider == 3600000 ) {
		timeText = ' godzin';
	}
	time.innerText = Math.ceil( ( Date.now() - theDate ) / divider ) + timeText;
	h1.appendChild( time );
}

