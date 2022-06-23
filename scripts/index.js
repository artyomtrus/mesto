import initialCards from "./utils/constants.js";
import options from "./validatorOptions.js";
import { Section } from "./components/Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWitsForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-buton");
const fieldEditProfileName = document.querySelector(".popup__name_type_edit");
const fieldEditProfileProfession = document.querySelector(".popup__profession_type_edit");
const elements = document.querySelector(".elements");
const buttonAddSubmit = document.querySelector('.popup__form_type_add');
const addPopup = new PopupWitsForm('.popup_type_add', handleAddFormSubmit);
const editPopup = new PopupWitsForm('.popup_type_edit', handleEditFormSubmit)
const handleUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
});

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

const CardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.name, item.image, '#elements', handleCardClick);
    const cardElement = newCard.generateCard();
    function handleCardClick() {
      const newPopupImage = new PopupWithImage(".popup_type_image", item.name, item.image);
      newPopupImage.openPopup();
      newPopupImage.setEventListeners();
    }
    CardList.addItem(cardElement);
  }
}, '.elements');

function handleAddFormSubmit(e, getInputValues) {
  e.preventDefault()
  const newCard = new Card(getInputValues.popupAddName, getInputValues.popupAddLink, '#elements', handleCardClick);
  const cardElement = newCard.generateCard();
  function handleCardClick() {
    const newPopupImage = new PopupWithImage(".popup_type_image", getInputValues.popupAddName, getInputValues.popupAddLink);
    newPopupImage.openPopup();
    newPopupImage.setEventListeners();
  }
  elements.prepend(cardElement);
}

function handleEditFormSubmit(e, getInputValues) {
  e.preventDefault();
  handleUserInfo.setUserInfo({
    newName: getInputValues.popupName,
    newProfession: getInputValues.popupProfession
  })
}

profileEditButton.addEventListener("click", () => {
  const userProfile = handleUserInfo.getUserInfo();
  fieldEditProfileName.value = userProfile.name;
  fieldEditProfileProfession.value = userProfile.profession;
  formValidators['popupEditForm'].resetValidation();
  editPopup.openPopup();
});

buttonAddCard.addEventListener("click", () => {
  buttonAddSubmit.reset();
  formValidators['popupAddForm'].resetValidation();
  addPopup.openPopup();
});

CardList.renderItems();
addPopup.setEventListeners();
editPopup.setEventListeners();
enableValidation(options);