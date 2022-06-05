import initialCards from "./cards.js";
import options from "./validatorOptions.js";
import {
	closePopupEscape,
	closePopup,
	closePopupOverlay
} from './utils.js'
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-buton");
const buttonEditWindow = document.querySelector(".popup_type_edit");
const buttonAddWindow = document.querySelector(".popup_type_add");
const profileName = document.querySelector(".profile__name");
const fieldEditProfileName = document.querySelector(".popup__name_type_edit");
const profileProfession = document.querySelector(".profile__profession");
const fieldEditProfileProfession = document.querySelector(".popup__profession_type_edit");
const elements = document.querySelector(".elements");
const inputName = document.querySelector(".popup__name_type_add");
const inputLink = document.querySelector(".popup__link_type_add");
const popups = document.querySelectorAll(".popup");
const buttonAddSubmit = document.querySelector('.popup__form_type_add');
const buttonEditSubmit = document.querySelector('.popup__form_type_edit');

const formList = Array.from(document.querySelectorAll(options.formSelector));

formList.forEach((formElement) => {
	formElement.addEventListener("submit", (e) => {
		e.preventDefault();
	});
	const newFormValidator = new FormValidator(options, formElement);
	newFormValidator.enableValidation();
});

initialCards.forEach((addCard) => {
	const newCard = new Card(addCard.name, addCard.image);
	const cardElement = newCard.generateCard();
	elements.append(cardElement);
});

//!функции

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-active");
  document.addEventListener("keydown", closePopupEscape);
}

function openEditWindow() {
  fieldEditProfileName.value = profileName.textContent;
  fieldEditProfileProfession.value = profileProfession.textContent;
  openPopup(buttonEditWindow);
}

//!слушатели

profileEditButton.addEventListener("click", openEditWindow);

buttonAddCard.addEventListener("click", () => {
  inputName.value = '';
  inputLink.value = '';
  openPopup(buttonAddWindow);
});

buttonEditSubmit.addEventListener('submit', (e) => {
  if (buttonEditSubmit.checkValidity()) {
    e.preventDefault();
    profileName.textContent = fieldEditProfileName.value;
    profileProfession.textContent = fieldEditProfileProfession.value;
    closePopup(buttonEditWindow);
  }
});

buttonAddSubmit.addEventListener('submit', (e) => {
  const newCard = new Card(inputName.value, inputLink.value);
  if (buttonAddSubmit.checkValidity()) {
    e.preventDefault();
    elements.prepend(newCard.generateCard());
    closePopup(buttonAddWindow);
  }
});

popups.forEach((e) => {
  e.addEventListener("mousedown", closePopupOverlay);
});