import {closePopupField} from './modal.js';
import {addPlace} from './card.js';
import {toggleButtonState} from './validate.js'

const placeName = document.querySelector(`input[name='place-name']`);
const placeImageLink = document.querySelector(`input[name='place-image']`);
const nameInput = document.querySelector(`#title`);
const jobInput = document.querySelector(`#subtitle`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupPlace = document.querySelector(`.place-popup`);
const nameReplacement = document.querySelector(`.profile__title`);
const jobReplacement = document.querySelector(`.profile__subtitle`);

const validationParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_type_active'
};

const formEl = Array.from(popupPlace.querySelectorAll(validationParameters.inputSelector));
const buttonEl = popupPlace.querySelector('.popup__button-save');

// Изменение данных в попапе профиля
function submitFormProfile (evt){
    evt.preventDefault();
    nameReplacement.textContent = nameInput.value;
    jobReplacement.textContent = jobInput.value;
    closePopupField(popupProfile);
};
  
// Изменение данных в попапе карточки
function submitFormPlace (evt){
    evt.preventDefault();
    const placeValue = placeName.value;
    const linkValue = placeImageLink.value;
    addPlace (placeValue, linkValue);
    evt.target.reset();
    closePopupField(popupPlace);
    toggleButtonState(formEl, buttonEl, validationParameters); // Исправление ошибки с активной кнопкой сохранить на 2 и последующих вызовах попапа добавления карточки
}

 



export {submitFormProfile, submitFormPlace, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement, validationParameters};