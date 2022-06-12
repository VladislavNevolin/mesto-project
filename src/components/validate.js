const showInputError = (formErSearchEl, inputElement, errorMessage) => {
    const popupErrorText = formErSearchEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__error');
    popupErrorText.textContent = errorMessage;
    popupErrorText.classList.add(`popup__error_type_active`);
};
  
const hideInputError = (formErSearchEl, inputElement) => {
  const popupErrorText = formErSearchEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__error');
  popupErrorText.classList.remove(`popup__error_type_active`);
  popupErrorText.textContent = '';
};

const isValid = (formErSearchEl, inputElement) => {
  if (!inputElement.validity.valid){
    showInputError(formErSearchEl, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formErSearchEl, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive');
    buttonElement.setAttribute('disabled','');
  }else{
    buttonElement.classList.remove('popup__button-save_inactive');
    buttonElement.removeAttribute('disabled','');
  }
};
  
const setIventListeners = (formErSearchEl) => {
  const inputList = Array.from(formErSearchEl.querySelectorAll('.popup__input'));
  const buttonElement = formErSearchEl.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement)=>{
    inputElement.addEventListener('input', () => {
      isValid(formErSearchEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
 
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formErSearchEl) => {
    formErSearchEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setIventListeners(formErSearchEl);
  });
};

export {enableValidation,toggleButtonState};