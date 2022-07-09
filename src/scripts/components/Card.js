export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, myId) {
    this._name = data.name;
    this._image = data.link;
    this._handleCardClick = handleCardClick;
    this._templateElement = templateSelector;
    this._likes = data.likes || [];
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _addCard() {
    const cardElement = document
      .querySelector(this._templateElement)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _isLike = () => {
    return this._likes.some((user) => {
      return user._id === this._myId;
    })
  }

  addLikesNumber(number) {
    this._element.querySelector('.element__like-number').textContent = number.length;
  }

  refreshLikesNumber(number) {
    this._likes = number;
  }

  generateCard() {
    this._element = this._addCard();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._image;
    this._elementImage.alt = `Изображение ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    this.addLikesNumber(this._likes);
    this._setEventListeners();
    if (this._myId === this._ownerId) {
      this._element.querySelector('.element__del').classList.add('element__del_active')
    }
    this._likes.some((user) => {
      if (user._id === this._myId) {
        this._elementLike.classList.add("element__like_active")
      } else {
        this._elementLike.classList.remove("element__like_active")
      }
    })
    return this._element;
  }

  _deleteCard() {
    this._handleDeleteClick(this._id);
  }

  setDeleteCard() {
    this._element.remove();
  }

  addLikeCard() {
    this._elementLike.classList.add("element__like_active");
  }

  deleteLikeCard() {
    this._elementLike.classList.remove("element__like_active");
  }

  _togglelike() {
    this._handleLikeClick(this._id, this._isLike());
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLike.addEventListener('click', () => {
      this._togglelike();
    });
    this._element.querySelector('.element__del').addEventListener('click', () => {
      this._deleteCard()
    })
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }
};
