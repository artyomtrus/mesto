export class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
	}

	_handleEscClose = (e) => {
		if (e.key === "Escape") {
			this.closePopup();
		}
	}

	openPopup() {
		this._popup.classList.add("popup_is-active");
		document.addEventListener("keydown", this._handleEscClose);
	}

	closePopup = () => {
		this._popup.classList.remove("popup_is-active");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	_closePopupOverlay = (e) => {
		this._popupIsActive = e.currentTarget;
		if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
			this.closePopup();
		}
	}

	setEventListeners() {
		this._popup.addEventListener("mousedown", this._closePopupOverlay);
	}
}