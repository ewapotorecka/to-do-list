const addButton = document.getElementById( 'add' );
const taskInput = document.getElementById( 'task' );
// tasklist-> tasks
let taskList = [];
// funkcja ktora zwraca poczatkowe dane -> przypisanie do tasks
if ( localStorage.getItem( 'tasklist' ) ) { //'tasklist' powinno byc zmienna
	//try catch
	taskList = JSON.parse( localStorage.getItem( 'tasklist' ) );
	taskList.forEach( createListItem );
}

taskInput.addEventListener( 'keyup', function( event ) {
	// key name?
	if ( event.keyCode === 13 ) {
		document.getElementById( 'add' ).click();
	}
} );
// pod spodem na osobną funkcję do click i enter
// taskObject -> task
addButton.addEventListener( 'click', () => {
	if ( !taskInput.value ) {
		return;
	}

	const taskObject = {
		value: taskInput.value,
		done: false,
	};

	taskList.push( taskObject );
	createListItem( taskObject );
	updateLocalStorage( taskList );

} );

function createListItem( task ) {
	const taskElement = document.createElement( 'DIV' );
	const removeButton = document.createElement( 'BUTTON' );

	taskElement.classList.add( 'task-list-item' );
	taskElement.innerText = task.value;
	taskInput.value = '';
	removeButton.innerHTML = 'X';
	removeButton.classList.add( 'remove' );
	taskElement.appendChild( removeButton );

	taskElement.classList.toggle( 'done', task.done );

	taskElement.addEventListener( 'click', event => {
		if ( event.target === taskElement ) {
			task.done = !task.done;
			taskElement.classList.toggle( 'done' );
			updateLocalStorage( taskList );
		}
	} );

	removeButton.addEventListener( 'click', () => {
		const index = taskList.findIndex( t => t == task );
		taskList.splice( index, 1 );
		taskElement.remove();
		updateLocalStorage( taskList );
	} );

	document.body.appendChild( taskElement );
}

function updateLocalStorage( taskList ) {
	localStorage.setItem( 'tasklist', JSON.stringify( taskList ) );
}
// function createUniqueId() {
// 	const id = Math.floor( Math.random() * Math.pow( 10, 6 ) );

// 	for ( const element of taskList ) {
// 		if ( element.id == id ) {
// 			return createUniqueId();
// 		}
// 	}

// 	return id;
// }
