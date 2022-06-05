import {
	popupTypeImage,
	popupImage,
	popupImageTitle,
	closePopupEscape,
} from './utils.js'
export default class Card {
	constructor(name, image) {
		this._name = name;
		this._image = image;
	}
	_addCard() {
		const cardElement = document
			.querySelector('#elements')
			.content
			.querySelector('.element')
			.cloneNode(true);
		return cardElement;
	}

	generateCard() {
		this._element = this._addCard();
		this._element.querySelector('.element__image').src = this._image;
		this._element.querySelector('.element__title').textContent = this._name;
		this._setEventListeners();
		return this._element;
	}

	_deleteCard() {
		this._element.closest('.element').remove();
	}

	_togglelike() {
		this._element.querySelector('.element__like').classList.toggle("element__like_active");
	}

	_openPopupImage() {
		popupImage.src = this._image;
		popupImage.alt = this._name;
		popupImageTitle.textContent = this._name;
		popupTypeImage.classList.add("popup_is-active");
		document.addEventListener("keydown", closePopupEscape);
	}

	_setEventListeners() {
		this._element.querySelector('.element__like').addEventListener('click', () => {
			this._togglelike()
		});

		this._element.querySelector('.element__del').addEventListener('click', () => {
			this._deleteCard()
		})

		this._element.querySelector('.element__image').addEventListener('click', (e) => {
			this._openPopupImage()
		})
	}
};
