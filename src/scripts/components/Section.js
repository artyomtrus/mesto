export class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._container = document.querySelector(containerSelector);
		this._renderer = renderer;
	}

	renderItems() {
		this._items.forEach(item => {
			this._renderer(item);
		});
	}

	addItem(element, isBefore) {
		if (isBefore) {
			this._container.prepend(element);
		} else {
			this._container.append(element);
		}
	}

	setItems(items) {
		this._items = items;
	}
}
