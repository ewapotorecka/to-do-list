
export class TaskList {
	constructor( { containerElement, tasks, categoryName } ) {
		this._taskInput = containerElement.querySelector( '#task' );
		this._tasksContainer = containerElement.querySelector( '#tasks-container' );
		this._addButton = containerElement.querySelector( '#add' );
		this._categoryNameHeader = containerElement.querySelector( '#category-name' );
		this._onChangeListeners = [];

		this.set( { categoryName, tasks } );

		this._addButton.addEventListener( 'click', () => this._addTask() );
		this._taskInput.addEventListener( 'keyup', event => {
			if ( event.key === 'Enter' ) {
				this._addTask();
			}
		} );
	}

	onChange( listener ) {
		this._onChangeListeners.push( listener );
	}

	set( { categoryName, tasks } ) {
		this._categoryNameHeader.innerText = categoryName;
		this._tasksContainer.innerHTML = '';
		this._tasks = tasks;

		tasks.forEach( task => this._renderTask( task ) );
	}

	_addTask() {
		if ( !this._taskInput.value ) {
			return;
		}

		const task = {
			value: this._taskInput.value,
			done: false,
		};

		this._tasks.push( task );
		this._renderTask( task );
		this._onChangeListeners.forEach( listener => listener( this._tasks ) );
	}

	_renderTask( task ) {
		const taskElement = document.createElement( 'DIV' );
		const removeButton = document.createElement( 'BUTTON' );

		taskElement.classList.add( 'task-list-item' );
		taskElement.innerText = task.value;
		this._taskInput.value = '';
		removeButton.innerHTML = 'X';
		removeButton.classList.add( 'remove' );
		taskElement.appendChild( removeButton );

		taskElement.classList.toggle( 'done', task.done );

		taskElement.addEventListener( 'click', event => {
			if ( event.target === taskElement ) {
				task.done = !task.done;
				taskElement.classList.toggle( 'done' );
				this._onChangeListeners.forEach( listener => listener( this._tasks ) );
			}
		} );
 
		removeButton.addEventListener( 'click', () => {
			const index = this._tasks.findIndex( t => t == task );
			this._tasks.splice( index, 1 );
			taskElement.remove();
			this._onChangeListeners.forEach( listener => listener( this._tasks ) );
		} );

		this._tasksContainer.appendChild( taskElement );
	}
}
