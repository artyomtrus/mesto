import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButtonDelete = this._popup.querySelector('.popup__button_type_delete-card')
  }

  closePopup = () => {
    this._popup.classList.remove("popup_is-active");
  }

  sethandleDeleteSubmit(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  setEventListeners() {
    this._popupButtonDelete.addEventListener('click', () => {
      this._handleDeleteSubmit();
    })
    super.setEventListeners();
  }
}
