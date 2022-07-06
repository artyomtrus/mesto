import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = document.querySelector(".popup__image");
		this._popupImageTitle = document.querySelector(".popup__title-image");
	}

	openPopup(data) {
		this._popupImage.src = data.link;
		this._popupImage.alt = `Изображение ${data.name}`;
		this._popupImageTitle.textContent = data.name;
		super.openPopup();
	}
}