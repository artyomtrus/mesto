const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__title-image");

function closePopupEscape(e) {
	if (e.key === "Escape") {
		const popupIsActive = document.querySelector(".popup_is-active");
		closePopup(popupIsActive);
	}
}
function closePopup(popupElement) {
	popupElement.classList.remove("popup_is-active");
	document.removeEventListener("keydown", closePopupEscape);
}

function closePopupOverlay(e) {
	const popupIsActive = e.currentTarget;
	if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
		closePopup(popupIsActive);
	}
}

export {
	popupTypeImage,
	popupImage,
	popupImageTitle,
	closePopupEscape,
	closePopup,
	closePopupOverlay
};