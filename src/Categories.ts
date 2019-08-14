
export class Categories {
	private _categoryInput: HTMLInputElement;
	private _addCategoryButton: HTMLButtonElement;
	private _categoriesContainer: HTMLElement;
	private _categories: string[];
	private _onChangeListeners: Function[];
	private _onAddListeners: Function[];
	private _currentCategoryName: string;

	constructor( { containerElement, categories } ) {
		this._categoryInput = containerElement.querySelector( '#new-category' );
		this._addCategoryButton = containerElement.querySelector( '#add-category' );
		this._categoriesContainer = containerElement.querySelector( '#categories-container' );
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

	onChange( listener ) {
		this._onChangeListeners.push( listener );
	}

	onAdd( listener ) {
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

		this._categories.push( categoryName );
		this._renderCategory( categoryName );

		this._currentCategoryName = categoryName;

		this._onAddListeners.forEach( listener => listener( categoryName ) );
	}

	_renderCategory( categoryName ) {
		const newCategoryElement = document.createElement( 'DIV' );
		const removeButton = document.createElement( 'BUTTON' );

		newCategoryElement.classList.add( 'category' );
		newCategoryElement.innerText = categoryName;
		this._categoryInput.value = '';
		this._categoriesContainer.appendChild( newCategoryElement );
		removeButton.innerHTML = 'X';
		removeButton.classList.add( 'remove' );
		newCategoryElement.appendChild( removeButton );

		newCategoryElement.addEventListener( 'click', () => {
			this._currentCategoryName = categoryName;
			this._onChangeListeners.forEach( listener => listener( categoryName ) );
		} );

		removeButton.addEventListener( 'click', () => {
			newCategoryElement.remove();
		} );
	}
}
