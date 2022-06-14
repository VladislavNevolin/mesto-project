import { validationParameters } from "./utils.js";



const showInputError = (formErSearchEl, inputElement, errorMessage, validationParameters) => {
    const popupErrorText = formErSearchEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationParameters.inputErrorClass);
    popupErrorText.textContent = errorMessage;
    popupErrorText.classList.add(validationParameters.errorClass);
};
  
const hideInputError = (formErSearchEl, inputElement, validationParameters) => {
  const popupErrorText = formErSearchEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParameters.inputErrorClass);
  popupErrorText.classList.remove(validationParameters.errorClass);
  popupErrorText.textContent = '';
};

const isValid = (formErSearchEl, inputElement, validationParameters) => {
  if (!inputElement.validity.valid){
    showInputError(formErSearchEl, inputElement, inputElement.validationMessage, validationParameters);
  } else {
    hideInputError(formErSearchEl, inputElement, validationParameters);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validationParameters) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParameters.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }else{
    buttonElement.classList.remove(validationParameters.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};
  
const setIventListeners = (formErSearchEl, validationParameters) => {
  const inputList = Array.from(formErSearchEl.querySelectorAll(validationParameters.inputSelector));
  const buttonElement = formErSearchEl.querySelector(validationParameters.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationParameters);
  inputList.forEach((inputElement)=>{
    inputElement.addEventListener('input', () => {
      isValid(formErSearchEl, inputElement, validationParameters);
      toggleButtonState(inputList, buttonElement, validationParameters);
    });
  });
};
 
const enableValidation = (validationParameters) => {
  const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
  formList.forEach((formErSearchEl) => {
    formErSearchEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setIventListeners(formErSearchEl, validationParameters);
  });
};


export {enableValidation,toggleButtonState,setIventListeners,showInputError,hideInputError,isValid,hasInvalidInput};