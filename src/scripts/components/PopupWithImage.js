import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = document.querySelector(".popup__image");
		this._popupImageTitle = document.querySelector(".popup__title-image");
	}

	openPopup(name, image) {
		this._popupImage.src = image;
		this._popupImage.alt = `Изображение ${name}`;
		this._popupImageTitle.textContent = name;
		super.openPopup();
	}
}