import { TaskList, Task } from './TaskList';
import { Categories } from './Categories';

loadCategoryNames().then( categoryNames => {
	const categories = new Categories( {
		containerElement: document.getElementById( 'categories' ) as HTMLElement,
		categories: categoryNames
	} );

	loadTaskListItems( categories.getCurrentCategoryName() ).then( tasks => {
		const taskList = new TaskList( {
			containerElement: document.getElementById( 'task-list' ) as HTMLElement,
			tasks,
			categoryName: categories.getCurrentCategoryName()
		} );
	
		taskList.onChange( tasks => saveCategory(
			categories.getCurrentCategoryName(),
			tasks
		) );

		categories.onChange( ( categoryName: string ) => {
			if ( categoryName ) {
				loadTaskListItems( categoryName ).then( tasks => {
					taskList.set( {
						categoryName,
						tasks,
					} );
				} );
			} else {
				categories.addCategory( 'Main' );
				taskList.set( {
					categoryName: 'Main',
					tasks: []
				} );
			}
		} );
		
		categories.onAdd( ( categoryName: string ) => {
			taskList.set( {
				categoryName,
				tasks: [],
			} );
			
			saveCategory( categoryName, [] );
		} );

		categories.onRemove( ( categoryName: string ) => {
			removeCategory( categoryName );

		})
	} );
} );

function loadTaskListItems( categoryName: string ): Promise<Task[]> {
	return fetch( `/api/categories/${categoryName}`)
		.then( resp => resp.json() )
		.then( tasks => tasks || [] );
}

function saveCategory( categoryName: string, tasks: Task[] ) {
	return fetch( `/api/categories/${categoryName}`, {
		method: 'PUT',
		headers: { 
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( tasks )
	} );
}

function removeCategory( categoryName: string ) {
	return fetch( `/api/categories/${categoryName}`, {
		method: 'DELETE'
	} );
}

function loadCategoryNames(): Promise<string[]> {
	return fetch( '/api/categories' )
		.then( resp => resp.json() )
		.then( categoryNames => categoryNames || [ 'Main' ] );
}

