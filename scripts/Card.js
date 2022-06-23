export default class Card {
	constructor(name, image, templateSelector, handleCardClick) {
		this._name = name;
		this._image = image;
		this._handleCardClick = handleCardClick;
		this._templateElement = templateSelector;
	}
	_addCard() {
		const cardElement = document
			.querySelector(this._templateElement)
			.content
			.querySelector('.element')
			.cloneNode(true);
		return cardElement;
	}

	generateCard() {
		this._element = this._addCard();
		this._elementImage = this._element.querySelector('.element__image');
		this._elementImage.src = this._image;
		this._elementImage.alt = `Изображение ${this._name}`;
		this._element.querySelector('.element__title').textContent = this._name;
		this._setEventListeners();
		return this._element;
	}

	_deleteCard() {
		this._element.closest('.element').remove();
	}

	_togglelike() {
		this._elementLike.classList.toggle("element__like_active");
	}

	_setEventListeners() {
		this._elementLike = this._element.querySelector('.element__like');

		this._elementLike.addEventListener('click', () => {
			this._togglelike()
		});

		this._element.querySelector('.element__del').addEventListener('click', () => {
			this._deleteCard()
		})

		this._elementImage.addEventListener('click', () => {
			this._handleCardClick();
		})
	}
};
