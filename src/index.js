import { TaskList } from './TaskList';
import { Categories } from './Categories';

const taskList = new TaskList( {
	el: document.getElementById( 'task-list' ),
	tasks: loadTaskListItems( 'main' )
} );

const categories = new Categories( {
	el: document.getElementById( 'categories' ),
	categories: loadCategories()
} );

taskList.onChange( tasks => saveActiveTaskList( tasks ) );

categories.onChange( categoryName => {
	taskList.set( {
		categoryName,
		items: loadTaskListItems( categories.getCurrentCategoryName() )
	} );
} );

categories.onAdd( categoryName => {
	taskList.set( {
		categoryName,
		items: loadTaskListItems( categories.getCurrentCategoryName() )
	} );
} );

function loadTaskListItems( categoryName ) {
	if ( localStorage.getItem( 'task-list-' + categoryName ) ) {
		return JSON.parse( localStorage.getItem( 'task-list-' + categoryName ) );
	} else {
		return [];
	}
}

function saveActiveTaskList( tasks ) {
	const categoryName = categories.getCurrentCategoryName();
	localStorage.setItem( 'task-list-' + categoryName, JSON.stringify( tasks ) );
}

function loadCategories() {
	return [ 'main' ];
}

