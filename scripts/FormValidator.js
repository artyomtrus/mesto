import options from "./validatorOptions.js";
export default class FormValidator {
	constructor(options, formElement) {
		this._options = options;
		this._formElement = formElement;
	}

	_setEventListener() {
		const { inputSelector, submitButtonSelector } = this._options;
		this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
		this._popupButton = this._formElement.querySelector(submitButtonSelector);
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._isValid(inputElement);
				this._toggleButtonState();
			});
		});
	}

	_isValid(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._disableSubmitButton();
		} else {
			this._enableSubmitButton();
		}
	}

	_disableSubmitButton() {
		const { validButtonClass } = options;
		this._popupButton.classList.add(validButtonClass);
		this._popupButton.disabled = 'disabled';
	}

	_enableSubmitButton() {
		const { validButtonClass } = this._options;
		this._popupButton.classList.remove(validButtonClass);
		this._popupButton.disabled = '';
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_showInputError(inputElement) {
		const { inputErrorClass, errorClass } = this._options;
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(errorClass);
	}
	_hideInputError(inputElement) {
		const { inputErrorClass, errorClass } = this._options;

		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(inputErrorClass);
		errorElement.textContent = "";
		errorElement.classList.remove(errorClass);
	}

	enableValidation() {
		this._setEventListener();
	}
};







