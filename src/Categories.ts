
export class Categories {
	private _categoryInput: HTMLInputElement;
	private _addCategoryButton: HTMLButtonElement;
	private _categoriesContainer: HTMLElement;
	private _categories: string[];
	private _onChangeListeners: ( ( categoryName: string ) => void )[] = [];
	private _onAddListeners: ( ( categoryName: string ) => void )[] = [];
	private _onRemoveListeners: ( ( categoryName: string ) => void )[] = [];
	private _currentCategoryName: string;
	private elements: { [ name: string ]: HTMLElement } = {};

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

		this._currentCategoryName = this._categories[ 0 ];

		categories.forEach( category => this._renderCategory( category ) );
		this.updateActiveElement();
	}

	public get categoryNames(): ReadonlyArray<string> {
		return this._categories;
	}

	onChange( listener: ( categoryName: string ) => void ) {
		this._onChangeListeners.push( listener );
	}

	onAdd( listener: ( categoryName: string ) => void ) {
		this._onAddListeners.push( listener );
	}

	onRemove( listener: ( categoryName: string ) => void ) {
		this._onRemoveListeners.push( listener );
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
		this.updateActiveElement();
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
			this.updateActiveElement();
		} );

		removeButton.addEventListener( 'click', () => {
			const index = this._categories.findIndex( category => category == categoryName );
			this._categories.splice( index, 1 );
			this._onRemoveListeners.forEach( listener => listener( categoryName ) );
			newCategoryElement.remove();
		} );

		this.elements[ categoryName ] = newCategoryElement;
	
	}

	private updateActiveElement() {
		for ( const [ name, element ] of Object.entries( this.elements ) ) {
			if ( name == this._currentCategoryName ) {
				element.classList.add( 'active' );
			} else {
				element.classList.remove( 'active' );
			}
		}
		

	}
}

interface CategoryOptions {
	containerElement: HTMLElement;
	categories: string[];
}