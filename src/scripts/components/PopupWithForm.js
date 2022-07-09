import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupButton = this._popup.querySelector('.popup__button')
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      this._popupButton.textContent = 'Сохранение...';
      this._handleFormSubmit(e, this._getInputValues())
    })
    super.setEventListeners();
  }

  refreshButton(value) {
    this._popupButton.textContent = value;
  }
}