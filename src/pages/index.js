import { Api } from "../scripts/components/Api.js";
import options from "../scripts/utils/validatorOptions.js";
import { Section } from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import './index.css';

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-buton");
const fieldEditProfileName = document.querySelector(".popup__name_type_edit");
const fieldEditProfileProfession = document.querySelector(".popup__profession_type_edit");
const buttonAddSubmit = document.querySelector('.popup__form_type_add');
const buttonEditAvatar = document.querySelector('.profile__button-avatar');
const userInfoHandle = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__profession',
  avatarSelector: '.profile__avatar',
});
const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
const newPopupImage = new PopupWithImage(".popup_type_image");
const popupDelete = new PopupWithConfirmation('.popup_type_delete-card');
const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
const popupEditAvatar = new PopupWithForm('.popup_type_avatar', handleEditAvatarSubmit)
//const buttonConfirmationDelete = document.querySelector('.popup__button_type_delete-card');

//!валидация
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
//!

const API_CONFIG = {
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: '22b5d3c1-15e9-4089-aa4a-7712649273a9',
    'Content-Type': 'application/json',
  }
}

const api = new Api(API_CONFIG);

Promise.all([api.getUserId(), api.getCards()])
  .then(([userInfo, cardInfo]) => {
    userInfoHandle.setUserInfo(userInfo);
    userInfoHandle.setAvatar(userInfo);
    userInfoHandle.setUserId(userInfo._id);
    //cardList.setItems(cardInfo);
    cardList.renderItems(cardInfo);
  })

const cardList = new Section({
  items: [],
  renderer: (item) => {
    cardList.addItem(generateNewCard(item));
  }
}, '.elements');


function generateNewCard(data) {
  const myId = userInfoHandle.getUserId();
  const newCard = new Card(data, '#elements', handleCardClick, handleDeleteClick, handleLikeClick, api, myId);
  const cardElement = newCard.generateCard();
  function handleCardClick() {
    newPopupImage.openPopup(data);
  };

  function handleDeleteClick(id) {
    popupDelete.openPopup()
    popupDelete.sethandleDeleteSubmit(() => {
      api.deleteCard(id)
        .then(() => {
          cardElement.remove();
          popupDelete.closePopup();
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  function handleLikeClick(id, isLike, likeClass) {
    if (isLike) {
      api.deleteLike(id)
        .then((data) => {
          newCard.addLikesNumber(data.likes);
          newCard.refreshLikesNumber(data.likes);
          likeClass.classList.remove("element__like_active")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.putLike(id)
        .then((data) => {
          newCard.addLikesNumber(data.likes)
          newCard.refreshLikesNumber(data.likes)
          likeClass.classList.add("element__like_active")
        })
        .catch((err) => {
          console.log(err);
        });;
    }

  }
  return cardElement;
}


function handleEditFormSubmit(e, data) {
  e.preventDefault();
  api.setUserId(data)
    .then(() => {
      userInfoHandle.setUserInfo(data);
      popupEdit.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.refreshButton('Сохранить')
    })
    ;
}

function handleAddFormSubmit(e, getInputValues) {
  e.preventDefault();
  const isBefore = true;
  api.createCard({
    name: getInputValues.popupAddName,
    link: getInputValues.popupAddLink,
  })
    .then((data) => {
      cardList.addItem(generateNewCard(data), isBefore);
      popupAdd.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.refreshButton('Создать')
    });
}

function handleEditAvatarSubmit(e, avatar) {
  e.preventDefault();
  api.createNewAvatar(avatar)
    .then((data) => {
      userInfoHandle.setAvatar(data);
      popupEditAvatar.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.refreshButton('Сохранить');
    })
}

buttonAddCard.addEventListener("click", () => {
  formValidators['popupAddForm'].resetValidation();
  popupAdd.openPopup();
});

profileEditButton.addEventListener("click", () => {
  const userProfile = userInfoHandle.getUserInfo();
  fieldEditProfileName.value = userProfile.name;
  fieldEditProfileProfession.value = userProfile.about;
  formValidators['popupEditForm'].resetValidation();
  popupEdit.openPopup();
});

buttonEditAvatar.addEventListener('click', () => {
  formValidators['popupAvatarForm'].resetValidation();
  popupEditAvatar.openPopup();
})

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupDelete.setEventListeners();
popupEditAvatar.setEventListeners();
newPopupImage.setEventListeners();
enableValidation(options);