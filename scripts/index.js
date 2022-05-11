//!переменные

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-buton");
const editWindow = document.querySelector(".popup_type_edit");
const addWindow = document.querySelector(".popup_type_add");
const buttonCloseEditPopup = document.querySelector(".popup__close_type_edit");
const buttonCloseAddPopup = document.querySelector(".popup__close_type_add");
const profileName = document.querySelector(".profile__name");
const fieldEditProfileName = document.querySelector(".popup__name_type_edit");
const profileProfession = document.querySelector(".profile__profession");
const fieldEditProfileProfession = document.querySelector(".popup__profession_type_edit");
const editForm = document.querySelector(".popup__form_type_edit");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elements = document.querySelector(".elements");
const addForm = document.querySelector(".popup__form_type_add");
const inputName = document.querySelector(".popup__name_type_add");
const inputLink = document.querySelector(".popup__link_type_add");
const cardElement = document.querySelector("#elements").content.querySelector(".element");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__title-image");
const buttonClosePopupImage = document.querySelector(".popup__close_type_image");
const popup = document.querySelectorAll(".popup");

//!функции

function closePopup(close) {
  close.classList.remove("popup_is-active");
  document.removeEventListener("keydown", closePopupEscape);
}

function openPopup(open) {
  open.classList.add("popup_is-active");
  document.addEventListener("keydown", closePopupEscape);
}

function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    for (let i = 0; i < popup.length; i++) {
      closePopup(popup[i]);
    }
  }
}

function closePopupEscape(e) {
  if (e.key === "Escape") {
    for (let i = 0; i < popup.length; i++) {
      closePopup(popup[i]);
    }
  }
}

function openEditWindow() {
  openPopup(editWindow);
  fieldEditProfileName.value = profileName.textContent;
  fieldEditProfileProfession.value = profileProfession.textContent;
}

function saveInfo(e) {
  e.preventDefault();
  profileName.textContent = fieldEditProfileName.value;
  profileProfession.textContent = fieldEditProfileProfession.value;
  closePopup(editWindow);
}

function addFormSubmit(e) {
  e.preventDefault();
  elements.prepend(generateElement({ link: inputLink.value, name: inputName.value }));
  closePopup(addWindow);
}

function like(e) {
  e.target.classList.toggle("element__like_active");
}

function deleteClass(element) {
  element.remove();
}

function fillPopupImage(imagePopup, titleImagePopup, card) {
  imagePopup.src = card.link;
  imagePopup.alt = card.name;
  titleImagePopup.textContent = card.name;
}

function generateElement(addCard) {
  const newElement = cardElement.cloneNode(true);
  const cardTitle = newElement.querySelector(".element__title");
  const cardImage = newElement.querySelector(".element__image");
  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardTitle.textContent = addCard.name;

  const likeButton = newElement.querySelector(".element__like");
  likeButton.addEventListener("click", like);

  const deleteButton = newElement.querySelector(".element__del");

  deleteButton.addEventListener("click", deleteCard);

  function deleteCard() {
    deleteClass(newElement);
  }
  cardImage.addEventListener("click", openPopupImage);

  function openPopupImage() {
    fillPopupImage(popupImage, popupImageTitle, addCard);
    openPopup(popupTypeImage);
  }

  return newElement;
}

//!слушатели

profileEditButton.addEventListener("click", openEditWindow);

buttonCloseEditPopup.addEventListener("click", () => {
  closePopup(editWindow);
});

addButton.addEventListener("click", () => {
  openPopup(addWindow);
});

popup.forEach((e) => {
  e.addEventListener("mousedown", closePopupOverlay);
});

buttonCloseAddPopup.addEventListener("click", () => {
  closePopup(addWindow);
});

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupTypeImage);
});

initialCards.forEach((addCard) => {
  elements.append(generateElement(addCard));
});
