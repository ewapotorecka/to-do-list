
export class Categories {
	private _categoryInput: HTMLInputElement;
	private _addCategoryButton: HTMLButtonElement;
	private _categoriesContainer: HTMLElement;
	private _categories: string[];
	private _onChangeListeners: ( ( categoryName: string ) => void )[];
	private _onAddListeners: ( ( categoryName: string ) => void )[];
	private _currentCategoryName: string;

	constructor( { containerElement, categories }: CategoryOptions ) {
		this._categoryInput = containerElement.querySelector( '#new-category' ) as HTMLInputElement;
		this._addCategoryButton = containerElement.querySelector( '#add-category' ) as HTMLButtonElement;
		this._categoriesContainer = containerElement.querySelector( '#categories-container' ) as HTMLElement;
		this._categories = categories;
		this._categoryInput.addEventListener( 'keyup', event => {
			if ( event.key === 'Enter' ) {
				this._addCategory();
			}
		} );
		this._addCategoryButton.addEventListener( 'click', () => this._addCategory() );

		this._onChangeListeners = [];
		this._onAddListeners = [];
		this._currentCategoryName = this._categories[ 0 ];

		categories.forEach( category => this._renderCategory( category ) );
	}

	onChange( listener: ( categoryName: string ) => void ) {
		this._onChangeListeners.push( listener );
	}

	onAdd( listener: ( categoryName: string ) => void ) {
		this._onAddListeners.push( listener );
	}

	getCurrentCategoryName() {
		return this._currentCategoryName;
	}

	_addCategory() {
		if ( !this._categoryInput.value ) {
			return;
		}

		const categoryName = this._categoryInput.value;

		this.addCategory( categoryName );
	}

	addCategory( categoryName: string ) {
		this._categories.push( categoryName );
		this._renderCategory( categoryName );

		this._currentCategoryName = categoryName;

		this._onAddListeners.forEach( listener => listener( categoryName ) );
	}

	_renderCategory( categoryName: string ) {
		const newCategoryElement = document.createElement( 'DIV' );
		const removeButton = document.createElement( 'BUTTON' );

		newCategoryElement.classList.add( 'category' );
		newCategoryElement.innerText = categoryName;
		this._categoryInput.value = '';
		this._categoriesContainer.appendChild( newCategoryElement );
		removeButton.innerHTML = 'X';
		removeButton.classList.add( 'remove' );
		newCategoryElement.appendChild( removeButton );

		newCategoryElement.addEventListener( 'click', ( e ) => {
			if ( e.target !== newCategoryElement ) return;

			this._currentCategoryName = categoryName;
			this._onChangeListeners.forEach( listener => listener( categoryName ) );
		} );

		removeButton.addEventListener( 'click', () => {
			const index = this._categories.findIndex( category => category == categoryName );
			localStorage.removeItem( 'task-list-' + categoryName );
			this._categories.splice( index, 1 );
			newCategoryElement.remove();
			categoryName = this._categories[ 0 ];
			this._onChangeListeners.forEach( listener => listener( categoryName ) );
		} );

		// console.trace();
	}
}

interface CategoryOptions {
	containerElement: HTMLElement;
	categories: string[];
}