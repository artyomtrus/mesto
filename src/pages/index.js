import initialCards from "../scripts/utils/constants.js";
import options from "../scripts/utils/validatorOptions.js";
import { Section } from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import './index.css';

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-buton");
const fieldEditProfileName = document.querySelector(".popup__name_type_edit");
const fieldEditProfileProfession = document.querySelector(".popup__profession_type_edit");
const buttonAddSubmit = document.querySelector('.popup__form_type_add');
const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit)
const userInfoHandle = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
});
const newPopupImage = new PopupWithImage(".popup_type_image");

const formValidators = {};
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(options, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
};


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(generateNewCard(item));
  }
}, '.elements');

function generateNewCard(item) {
  const newCard = new Card(item.name, item.image, '#elements', handleCardClick);
  const cardElement = newCard.generateCard();
  function handleCardClick() {
    newPopupImage.openPopup(item.name, item.image);
  }
  return cardElement;
}

function handleAddFormSubmit(e, getInputValues) {
  e.preventDefault()
  const element = {}
  element.name = getInputValues.popupAddName;
  element.image = getInputValues.popupAddLink;
  cardList.addItem(generateNewCard(element));
}

function handleEditFormSubmit(e, getInputValues) {
  e.preventDefault();
  userInfoHandle.setUserInfo(getInputValues.popupName, getInputValues.popupProfession
  )
}

profileEditButton.addEventListener("click", () => {
  const userProfile = userInfoHandle.getUserInfo();
  fieldEditProfileName.value = userProfile.name;
  fieldEditProfileProfession.value = userProfile.profession;
  formValidators['popupEditForm'].resetValidation();
  popupEdit.openPopup();
});

buttonAddCard.addEventListener("click", () => {
  buttonAddSubmit.reset();
  formValidators['popupAddForm'].resetValidation();
  popupAdd.openPopup();
});

cardList.renderItems();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
newPopupImage.setEventListeners();
enableValidation(options);