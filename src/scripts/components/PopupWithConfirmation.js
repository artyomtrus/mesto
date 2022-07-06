import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}

	closePopup = () => {
		this._popup.classList.remove("popup_is-active");
	}

	setEventListeners() {
		document.addEventListener("keydown", this._handleEscClose);
		super.setEventListeners();
		}
	}
