import { Popup } from "./Popup.js";

export class PopupWitsForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
		this._form = this._popup.querySelector('.popup__form')
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
		super.setEventListeners();
		this._form.addEventListener('submit', (e) => {
			this._handleFormSubmit(e, this._getInputValues());
			this.closePopup();
		})
	}
}