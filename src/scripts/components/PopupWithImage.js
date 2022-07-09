import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageTitle = this._popup.querySelector(".popup__title-image");
  }

  closePopup() {
    this._popup.classList.remove("popup_is-active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  openPopup(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `Изображение ${data.name}`;
    this._popupImageTitle.textContent = data.name;
    super.openPopup();
  }
}