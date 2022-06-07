import initialCards from "./cards.js";
import options from "./validatorOptions.js";
import {
  popupTypeImage,
  popupImage,
  popupImageTitle,
  closePopup,
  closePopupOverlay,
  openPopup
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

const formValidators = {};
console.log(formValidators);
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(options, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
};

enableValidation(options);

function createCard(addCard) {
  const newCard = new Card(addCard.name, addCard.image, openPopupImage, '#elements');
  const cardElement = newCard.generateCard();
  return cardElement;
}

initialCards.forEach((addCard) => {
  elements.append(createCard(addCard));
});

function openPopupImage(name, image) {
  popupImage.src = image;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupTypeImage);
}

function openEditWindow() {
  fieldEditProfileName.value = profileName.textContent;
  fieldEditProfileProfession.value = profileProfession.textContent;
  formValidators['popupEditForm'].resetValidation();
  openPopup(buttonEditWindow);
}

//!слушатели

profileEditButton.addEventListener("click", openEditWindow);

buttonAddCard.addEventListener("click", () => {
  buttonAddSubmit.reset();
  formValidators['popupAddForm'].resetValidation();
  openPopup(buttonAddWindow);
});

buttonEditSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = fieldEditProfileName.value;
  profileProfession.textContent = fieldEditProfileProfession.value;
  closePopup(buttonEditWindow);
}
);

buttonAddSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  initialCards.name = inputName.value;
  initialCards.image = inputLink.value;
  elements.prepend(createCard(initialCards));
  closePopup(buttonAddWindow);
}
);

popups.forEach((e) => {
  e.addEventListener("mousedown", closePopupOverlay);
});