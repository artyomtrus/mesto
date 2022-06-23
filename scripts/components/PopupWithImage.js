import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector, name, image) {
		super(popupSelector);
		this._name = name;
		this._image = image;
		this._popupImage = document.querySelector(".popup__image");
		this._popupImageTitle = document.querySelector(".popup__title-image");
	}

	openPopup() {
		this._popupImage.src = this._image;
		this._popupImage.alt = `Изображение ${this._name}`;
		this._popupImageTitle.textContent = this._name;
		this._popup.classList.add("popup_is-active");
		document.addEventListener("keydown", this._handleEscClose);
	}
}