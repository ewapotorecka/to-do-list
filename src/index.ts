import { TaskList, Task } from './TaskList';
import { Categories } from './Categories';

const defaultCategoryName = 'Main';

loadCategoryNames().then( async categoryNames => {
	const categories = new Categories( {
		containerElement: document.getElementById( 'categories' ) as HTMLElement,
		categories: categoryNames
	} );

	const taskList = new TaskList( {
		containerElement: document.getElementById( 'task-list' ) as HTMLElement,
		tasks: await loadTaskListItems( categories.getCurrentCategoryName() ),
		categoryName: categories.getCurrentCategoryName()
	} );

	taskList.onChange( ( categoryName, tasks ) => saveCategory(
		categoryName,
		tasks
	) );

	categories.onAdd( ( categoryName: string ) => {
		taskList.set( {
			categoryName,
			tasks: [],
		} );

		saveCategory( categoryName, [] );
	} );

	categories.onChange( async ( categoryName: string ) => {
		taskList.set( {
			categoryName,
			tasks: await loadTaskListItems( categoryName ),
		} );
	} );

	categories.onRemove( async ( categoryName ) => {
		removeCategory( categoryName );

		const nextCategoryName = categories.categoryNames[ 0 ];

		if ( nextCategoryName ) {
			taskList.set( {
				categoryName: nextCategoryName,
				tasks: await loadTaskListItems( nextCategoryName ),
			} );
		} else {
			taskList.set( {
				categoryName: defaultCategoryName,
				tasks: [],
			} );

			categories.addCategory( defaultCategoryName );
		}
	} );
} );

function loadTaskListItems( categoryName: string ): Promise<Task[]> {
	return fetch( `/api/categories/${ categoryName }` )
		.then( resp => resp.json() )
		.then( tasks => tasks || [] );
}

function saveCategory( categoryName: string, tasks: Task[] ) {
	return fetch( `/api/categories/${ categoryName }`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( tasks )
	} );
}

function removeCategory( categoryName: string ) {
	return fetch( `/api/categories/${ categoryName }`, {
		method: 'DELETE'
	} );
}

function loadCategoryNames(): Promise<string[]> {
	return fetch( '/api/categories' )
		.then( resp => resp.json() )
		.then( categoryNames => categoryNames || [ defaultCategoryName ] );
}

