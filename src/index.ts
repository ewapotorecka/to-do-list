import { TaskList, Task } from './TaskList';
import { Categories } from './Categories';

const categories = new Categories( {
	containerElement: document.getElementById( 'categories' ) as HTMLElement,
	categories: loadCategoryNames()
} );

const taskList = new TaskList( {
	containerElement: document.getElementById( 'task-list' ) as HTMLElement,
	tasks: loadTaskListItems( categories.getCurrentCategoryName() ),
	categoryName: categories.getCurrentCategoryName()
} );

taskList.onChange( tasks => saveActiveTaskList( tasks ) );

categories.onChange( ( categoryName: string ) => {
	taskList.set( {
		categoryName,
		tasks: loadTaskListItems( categoryName )
	} );
} );

categories.onAdd( ( categoryName: string ) => {
	taskList.set( {
		categoryName,
		tasks: loadTaskListItems( categoryName )
	} );
} );

function loadTaskListItems( categoryName: string ) {
	const item = localStorage.getItem( 'task-list-' + categoryName )
	if ( item ) {
		return JSON.parse( item);
	} else {
		return [];
	}
}

function saveActiveTaskList( tasks: Task[] ) {
	console.log( tasks, 'task-list-' + categories.getCurrentCategoryName() );
	const categoryName = categories.getCurrentCategoryName();
	localStorage.setItem( 'task-list-' + categoryName, JSON.stringify( tasks ) );
}

function loadCategoryNames() {
	const categoryNames = Object.keys( localStorage )
		.filter( el => el.startsWith( 'task-list-' ) )
		.sort();

	return categoryNames.length > 0 ?
		categoryNames.map( name => name.replace( /^task-list-/, '' ) ) :
		[ 'Main' ];
}
