//!Валидация

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, popupButton, { validButtonClass }) {
  if (hasInvalidInput(inputList)) {
    popupButton.classList.add(validButtonClass);
  } else {
    popupButton.classList.remove(validButtonClass);
  }
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function setEventListener(formElement, { inputSelector, submitButtonSelector }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const popupButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, popupButton, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, options);
      toggleButtonState(inputList, popupButton, options);
    });
  });
}

function enableValidation({ formSelector }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formElement.checkValidity()) {
        validationEditForm(formElement, e);
        validationAddForm(formElement, e);
      }
    });
    setEventListener(formElement, options);
  });
}

const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  validButtonClass: "popup__button_valid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

enableValidation(options);
