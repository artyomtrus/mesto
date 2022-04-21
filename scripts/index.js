//открыть-закрыть popup

const profileEditButton = document.querySelector('.profile__edit-button');
const editWindow = document.querySelector('.popup');
const editWindowClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const editProfileName = document.querySelector('.popup__name');
const profileProfession = document.querySelector('.profile__profession');
const editProfession = document.querySelector('.popup__profession');
const editForm = document.querySelector('.popup__form');

function openEditWindow() {
	editWindow.classList.add('popup_is-active');
	editProfileName.value = profileName.textContent;
	editProfession.value = profileProfession.textContent;
}

function closeEditWindow() {
	editWindow.classList.remove('popup_is-active');
}

profileEditButton.addEventListener('click', openEditWindow);
editWindowClose.addEventListener('click', closeEditWindow);

function saveInfo(e) {
	e.preventDefault();
	profileName.textContent = editProfileName.value;
	profileProfession.textContent = editProfession.value;
	closeEditWindow();
}

editForm.addEventListener('submit', saveInfo);