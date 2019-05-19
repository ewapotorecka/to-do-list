
export class Categories {
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
		this._renderCategory( this._currentCategoryName );
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

		const category = {
			name: this._categoryInput.value
		};

		this._categories.push( category );
		this._renderCategory( category );

		this._onAddListeners.forEach( listener => listener( category.name ) );
	}

	_renderCategory( category ) {
		const newCategoryElement = document.createElement( 'DIV' );
		const removeButton = document.createElement( 'BUTTON' );

		newCategoryElement.classList.add( 'category' );
		newCategoryElement.innerText = category.name;
		this._currentCategoryName = category.name;
		this._categoryInput.value = '';
		this._categoriesContainer.appendChild( newCategoryElement );
		removeButton.innerHTML = 'X';
		removeButton.classList.add( 'remove' );
		newCategoryElement.appendChild( removeButton );

		newCategoryElement.addEventListener( 'click', () => {
			this._currentCategoryName = category.name;
			this._onChangeListeners.forEach( listener => listener( category.name ) );
		} );

		removeButton.addEventListener( 'click', () => {
			newCategoryElement.remove();
		} );
	}
}
