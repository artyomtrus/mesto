//!переменныеbuttonAddWindow

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
const cardElement = document.querySelector("#elements").content.querySelector(".element");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__title-image");
const popups = document.querySelectorAll(".popup");
const buttonAddSubmit = document.querySelector('.popup__form_type_add');
const buttonEditSubmit = document.querySelector('.popup__form_type_edit');

//!функции

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-active");
  document.removeEventListener("keydown", closePopupEscape);
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-active");
  document.addEventListener("keydown", closePopupEscape);
}

function closePopupOverlay(e) {
  const popupIsActive = e.currentTarget;
  if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
    closePopup(popupIsActive);
  }
}

function closePopupEscape(e) {
  if (e.key === "Escape") {
    const popupIsActive = document.querySelector(".popup_is-active");
    closePopup(popupIsActive);
  }
}

function openEditWindow() {
  fieldEditProfileName.value = profileName.textContent;
  fieldEditProfileProfession.value = profileProfession.textContent;
  openPopup(buttonEditWindow);
}

function togglelike(e) {
  e.target.classList.toggle("element__like_active");
}

function deleteCard(element) {
  element.target.closest(".element").remove();
}

function openPopupImage(imagePopup, titleImagePopup, card) {
  imagePopup.src = card.link;
  imagePopup.alt = card.name;
  titleImagePopup.textContent = card.name;
  openPopup(popupTypeImage);
}

function generateElement(addCard) {
  const newElement = cardElement.cloneNode(true);
  const cardTitle = newElement.querySelector(".element__title");
  const cardImage = newElement.querySelector(".element__image");
  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardTitle.textContent = addCard.name;

  const likeButton = newElement.querySelector(".element__like");
  likeButton.addEventListener("click", togglelike);

  const deleteButton = newElement.querySelector(".element__del");

  deleteButton.addEventListener("click", deleteCard);

  cardImage.addEventListener("click", () => {
    openPopupImage(popupImage, popupImageTitle, addCard);
  });

  return newElement;
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
  if (buttonAddSubmit.checkValidity()) {
    e.preventDefault();
    elements.prepend(generateElement({ link: inputLink.value, name: inputName.value }));
    closePopup(buttonAddWindow);
  }
});

popups.forEach((e) => {
  e.addEventListener("mousedown", closePopupOverlay);
});

initialCards.forEach((addCard) => {
  elements.append(generateElement(addCard));
});
