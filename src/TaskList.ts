
export class TaskList {
	private _taskInput: HTMLInputElement;
	private _tasksContainer: HTMLElement;
	private _addButton: HTMLElement;
	private _categoryNameHeader: HTMLElement;
	private _onChangeListeners: ( ( categoryName: string, tasks: Task[] ) => void )[] = [];
	private _tasks!: Task[];
	private _categoryName!: string;
	private elements: { [ name: string ]: HTMLElement } = {};

	constructor( { containerElement, tasks, categoryName }: TaskListOptions ) {
		this._taskInput = containerElement.querySelector( '#task' ) as HTMLInputElement;
		this._tasksContainer = containerElement.querySelector( '#tasks-container' ) as HTMLElement;
		this._addButton = containerElement.querySelector( '#add' ) as HTMLButtonElement;
		this._categoryNameHeader = containerElement.querySelector( '#category-name' ) as HTMLHeadElement;

		this.set( { categoryName, tasks } );

		this._addButton.addEventListener( 'click', () => this._addTask() );
		this._taskInput.addEventListener( 'keyup', event => {
			if ( event.key === 'Enter' ) {
				this._addTask();
			}
		} );
	}

	onChange( listener: ( categoryName: string, tasks: Task[] ) => void ) {
		this._onChangeListeners.push( listener );
	}

	set( { categoryName, tasks }: { categoryName: string; tasks: Task[] } ) {
		this._categoryNameHeader.innerText = categoryName;
		this._tasksContainer.innerHTML = '';
		this._tasks = tasks;
		this._categoryName = categoryName;

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
		this._onChangeListeners.forEach( listener => listener( this._categoryName, this._tasks ) );
	}

	_renderTask( task: Task ) {
		const taskElement = document.createElement( 'DIV' );
		const removeButton = document.createElement( 'BUTTON' );

		taskElement.classList.add( 'task-list-item' );
		taskElement.innerText = task.value;
		const name = task.value;
		this._taskInput.value = '';
		removeButton.innerHTML = 'X';
		removeButton.classList.add( 'remove' );
		taskElement.appendChild( removeButton );

		taskElement.classList.toggle( 'done', task.done );

		taskElement.addEventListener( 'click', event => {
			if ( event.target === taskElement ) {
				task.done = !task.done;
				taskElement.classList.toggle( 'done' );
				this._onChangeListeners.forEach( listener => listener( this._categoryName, this._tasks ) );
			}
		} );

		removeButton.addEventListener( 'click', () => {
			const index = this._tasks.findIndex( t => t == task );
			this._tasks.splice( index, 1 );
			taskElement.remove();
			this._onChangeListeners.forEach( listener => listener( this._categoryName, this._tasks ) );
		} );

		this._tasksContainer.appendChild( taskElement );
		this.elements[ name ] = taskElement;
	}

	private sortTaskList() {

	}
}

export interface Task {
	done: boolean;
	value: string;
}

interface TaskListOptions {
	containerElement: HTMLElement;
	tasks: Task[];
	categoryName: string;
}
