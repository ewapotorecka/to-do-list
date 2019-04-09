const addButton = document.getElementById( 'add' );
const taskInput = document.getElementById( 'task' );
const taskList = [];

addButton.addEventListener( 'click', createListItem );

function createListItem() {
	const task = document.createElement( 'DIV' );
	task.classList.add( 'task-list-item' );
	task.innerText = taskInput.value;
	taskInput.value = '';
	document.body.appendChild( task );
	const taskObject = {
		id: createId(),
		value: task.innerText,
		done: false,
	};
	taskList.push( taskObject );
	const remove = document.createElement( 'BUTTON' );
	remove.innerHTML = 'X';
	remove.classList.add( 'remove' );
	task.appendChild( remove );
	task.addEventListener( 'click', event => {
		if ( event.target === task ) {
			task.classList.toggle( 'done' );
		}
	} );
	remove.addEventListener( 'click', () => {
		task.remove();
	} );
}

function createId() {
	return Math.floor( Math.random() * 100 );
}
