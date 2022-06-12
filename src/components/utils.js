import {closePopupField} from './modal.js';
import {addPlace} from './card.js';

const placeName = document.querySelector(`input[name='place-name']`);
const placeImageLink = document.querySelector(`input[name='place-image']`);
const nameInput = document.querySelector(`#title`);
const jobInput = document.querySelector(`#subtitle`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupPlace = document.querySelector(`.place-popup`);
const nameReplacement = document.querySelector(`.profile__title`);
const jobReplacement = document.querySelector(`.profile__subtitle`);
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
    closePopupField(popupPlace);
    evt.target.reset();
}



export {submitFormProfile, submitFormPlace, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement};