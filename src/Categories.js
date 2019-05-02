
export class Categories {
	constructor( { el, categories } ) {
		this._categoryInput = el.querySelector( '#new-category' );
		this._addCategoryButton = el.querySelector( '#add-category' );
		this._categoriesContainer = el.querySelector( '#categories-container' );
		this._categoryInput.addEventListener( 'keyup', function( event ) {
			if ( event.key === 'Enter' ) {
				this._addCategory();
			}
		} );
		this._addCategoryButton.addEventListener( 'click', () => this._addCategory() );
		this._addCategoryButton.addEventListener( 'click', () => this._addCategory() );

		this._onChangeListeners = [];
		this._onAddListeners = [];
	}

	onChange( listener ) {
		this._onChangeListeners.push( listener );
	}

	onAdd( listener ) {
		this._onAddListeners.push( listener );
	}

	getCurrentCategoryName() {
		return 'main';
	}

	_addCategory() {
		if ( !this._categoryInput.value ) {
			return;
		}

		const newCategoryElement = document.createElement( 'DIV' );
		newCategoryElement.classList.add( 'category' );
		newCategoryElement.innerText = this._categoryInput.value;
		this._categoryInput.value = '';
		this._categoriesContainer.appendChild( newCategoryElement );

		this._onAddListeners.forEach( listener => listener(  ) );
	}
}
