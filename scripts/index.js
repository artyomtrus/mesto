//открыть-закрыть popup

const profileEditButton = document.querySelector('.profile__edit-button');
const editWindow = document.querySelector('.popup');
const editWindowClose = document.querySelector('.popup__close');

function toggleEditWindow() {
	editWindow.classList.toggle('popup_is-active');
}

profileEditButton.addEventListener('click', toggleEditWindow);
editWindowClose.addEventListener('click', toggleEditWindow);

function overlayClickEditWindow(event) {
	if (event.target === event.currentTarget) {
		toggleEditWindow();
	}
}

editWindow.addEventListener('click', overlayClickEditWindow);

//редактирование
const profileName = document.querySelector('.profile__name');
const editProfileName = document.querySelector('.popup__name');
const profileProfession = document.querySelector('.profile__profession');
const editProfession = document.querySelector('.popup__profession');


function submitProfileName(event) {
	editProfileName.value = profileName.textContent;
	editProfession.value = profileProfession.textContent;
}

profileEditButton.addEventListener('click', submitProfileName)

//сохранение
const buttonSave = document.querySelector('.popup__button-save');

function saveInfo() {
	profileName.textContent = editProfileName.value;
	profileProfession.textContent = editProfession.value;
	editWindow.classList.remove('popup_is-active');
}

buttonSave.addEventListener('click', saveInfo);