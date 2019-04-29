( function() {
	const addButton = document.getElementById( 'add' );
	const taskInput = document.getElementById( 'task' );
	const tasksContainer = document.getElementById( 'tasks-container' );
	const localStorageKey = 'to-do-list';
	const categoryInput = document.getElementById( 'new-category' );

	const tasks = getInitialData();
	tasks.forEach( renderTask );

	function getInitialData() {
		if ( localStorage.getItem( localStorageKey ) ) {
			return JSON.parse( localStorage.getItem( localStorageKey ) );
		} else {
			return [];
		}
	}

	taskInput.addEventListener( 'keyup', function( event ) {
		if ( event.key === 'Enter' ) {
			addTask();
		}
	} );
 
	addButton.addEventListener( 'click', addTask );

	function addTask() {
		if ( !taskInput.value ) {
			return;
		}

		const task = {
			value: taskInput.value,
			done: false,
		};

		tasks.push( task );
		renderTask( task );
		saveTasks();
	}

	function renderTask( task ) {
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
				saveTasks();
			}
		} );

		removeButton.addEventListener( 'click', () => {
			const index = tasks.findIndex( t => t == task );
			tasks.splice( index, 1 );
			taskElement.remove();
			saveTasks();
		} );

		tasksContainer.appendChild( taskElement );
	}

	function saveTasks() {
		localStorage.setItem( localStorageKey, JSON.stringify( tasks ) );
	}
}() );
