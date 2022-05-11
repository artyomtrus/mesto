//!Валидация

function showInputError(formElement, inputElement, errorMessage, options) {
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;

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

function toggleButtonState(inputList, popupButton, options) {
  const validButtonClass = options.validButtonClass;

  if (hasInvalidInput(inputList)) {
    popupButton.classList.add(validButtonClass);
  } else {
    popupButton.classList.remove(validButtonClass);
  }
}

function isValid(formElement, inputElement, options) {
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {
      inputErrorClass: inputErrorClass,
      errorClass: errorClass,
    });
  } else {
    hideInputError(formElement, inputElement, {
      inputErrorClass: inputErrorClass,
      errorClass: errorClass,
    });
  }
}

function setEventListener(formElement, options) {
  const inputSelector = options.inputSelector;
  const submitButtonSelector = options.submitButtonSelector;
  const validButtonClass = options.validButtonClass;
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const popupButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, popupButton, { validButtonClass: validButtonClass });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, {
        inputErrorClass: inputErrorClass,
        errorClass: errorClass,
      });
      toggleButtonState(inputList, popupButton, {
        validButtonClass: validButtonClass,
      });
    });
  });
}

function enableValidation(options) {
  const formSelector = options.formSelector;
  const inputSelector = options.inputSelector;
  const submitButtonSelector = options.submitButtonSelector;
  const validButtonClass = options.validButtonClass;
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formElement.checkValidity()) {
        if (formElement.id === "editForm") {
          saveInfo(e);
        }
        if (formElement.id === "addForm") {
          addFormSubmit(e);
        }
      }
    });
    setEventListener(formElement, {
      inputSelector: inputSelector,
      submitButtonSelector: submitButtonSelector,
      validButtonClass: validButtonClass,
      inputErrorClass: inputErrorClass,
      errorClass: errorClass,
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  validButtonClass: "popup__button_valid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
});
