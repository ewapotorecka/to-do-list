
export class Categories {
	constructor( { containerElement, categories } ) {
		this._categoryInput = containerElement.querySelector( '#new-category' );
		this._addCategoryButton = containerElement.querySelector( '#add-category' );
		this._categoriesContainer = containerElement.querySelector( '#categories-container' );
		this._categories = categories;
		this._categoryInput.addEventListener( 'keyup', function( event ) {
			if ( event.key === 'Enter' ) {
				this._addCategory();
			}
		} );
		this._addCategoryButton.addEventListener( 'click', () => this._addCategory() );

		this._onChangeListeners = [];
		this._onAddListeners = [];
		this._currentCategoryName = this._categories[ 0 ];
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

		this._onAddListeners.forEach( listener => listener( this._categories ) );
	}

	_renderCategory( category ) {
		const newCategoryElement = document.createElement( 'DIV' );
		newCategoryElement.classList.add( 'category' );
		newCategoryElement.innerText = category.name;
		this._categoryInput.value = '';
		this._categoriesContainer.appendChild( newCategoryElement );

		newCategoryElement.addEventListener( 'click', () => {
			this._currentCategoryName = category.name;
			this._onChangeListeners.forEach( listener => listener( category.name ) );
		} );
	}
}
