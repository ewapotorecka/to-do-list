import { TaskList } from './TaskList';
import { Categories } from './Categories';

const categories = new Categories( {
	containerElement: document.getElementById( 'categories' ),
	categories: loadCategories()
} );

const taskList = new TaskList( {
	containerElement: document.getElementById( 'task-list' ),
	tasks: loadTaskListItems( categories.getCurrentCategoryName() ),
	categoryName: categories.getCurrentCategoryName()
} );

taskList.onChange( tasks => saveActiveTaskList( tasks ) );

categories.onChange( categoryName => {
	taskList.set( {
		categoryName,
		tasks: loadTaskListItems( categoryName )
	} );
} );

categories.onAdd( categoryName => {
	taskList.set( {
		categoryName,
		tasks: loadTaskListItems( categoryName )
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
	const categories = [ { name: 'Main' } ];
	return categories;
}

