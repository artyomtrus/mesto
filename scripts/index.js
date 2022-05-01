//открыть-закрыть popup

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-buton");
const editWindow = document.querySelector(".popup");
const addWindow = document.querySelector(".popup-add");
const editWindowClose = document.querySelector(".popup__close");
const addWindowClose = document.querySelector(".popup-add__close");
const profileName = document.querySelector(".profile__name");
const editProfileName = document.querySelector(".popup__name");
const profileProfession = document.querySelector(".profile__profession");
const editProfession = document.querySelector(".popup__profession");
const editForm = document.querySelector(".popup__form");

function openEditWindow() {
  editWindow.classList.add("popup_is-active");
  editProfileName.value = profileName.textContent;
  editProfession.value = profileProfession.textContent;
}

function closeEditWindow(e) {
  editWindow.classList.remove("popup_is-active");
}

function openAddWindow() {
  addWindow.classList.add("popup-add_is-active");
}

function closeAddWindow() {
  addWindow.classList.remove("popup-add_is-active");
}

profileEditButton.addEventListener("click", openEditWindow);
editWindowClose.addEventListener("click", closeEditWindow);

addButton.addEventListener("click", openAddWindow);
addWindowClose.addEventListener("click", closeAddWindow);

function saveInfo(e) {
  e.preventDefault();
  profileName.textContent = editProfileName.value;
  profileProfession.textContent = editProfession.value;
  closeEditWindow();
}

editForm.addEventListener("submit", saveInfo);

//!ПР 5

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
const addForm = document.querySelector(".popup-add__form");
const inputName = document.querySelector(".popup-add__name");
const inputLink = document.querySelector(".popup-add__link");

const cardElement = document
  .querySelector("#elements")
  .content.querySelector(".element");

addForm.addEventListener("submit", addFormSubmit);

function addFormSubmit(e) {
  e.preventDefault();
  elements.prepend(
    generateElement({ link: inputLink.value, name: inputName.value })
  );
  closeAddWindow();
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

  function like(e) {
    e.target.classList.toggle("element__like_active");
  }

  const deleteButton = newElement.querySelector(".element__del");
  deleteButton.addEventListener("click", () => {
    newElement.remove();
  });

  const popupImage = document.querySelector(".popup-image");
  const popupImagePic = document.querySelector(".popup-image__pic");
  const popupImageTitle = document.querySelector(".popup-image__title");

  cardImage.addEventListener("click", () => {
    popupImage.classList.add("popup-image_is-active");
    popupImagePic.src = addCard.link;
    popupImagePic.alt = addCard.name;
    popupImageTitle.textContent = addCard.name;
  });

  const closeButtonPopupImage = document.querySelector(".popup-image__close");
  closeButtonPopupImage.addEventListener("click", closePopupImage);
  function closePopupImage() {
    popupImage.classList.remove("popup-image_is-active");
  }

  return newElement;
}

initialCards.forEach((addCard) => {
  elements.append(generateElement(addCard));
});
