import '../pages/index.css';


import {openPopupField, closePopupField} from './modal.js';
import {buttonEl,buttonSaveAvatar,popupAvatar,submitFormAvatar,formElement,submitFormProfile,submitFormPlace, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement, validationParameters,profileAvatar,popupProfileForm,formAvatar} from './utils.js';
import {enableValidation} from './validate.js';
import { getProfileInfo, getCards} from './api.js';
import { popupImageContainer,elements,createPlace,formElementPlace } from './card.js';

const editButtonPopup = document.querySelector(`.profile__edit-button`);
const addButtonPopup = document.querySelector(`.profile__add-button`);
const closeProfilePopup = document.querySelector(`button[name='close-profile-button']`);
const closePlacePopup = document.querySelector(`button[name='close-place-button']`);
const closeImagePopup = document.querySelector(`button[name='close-image-button']`);
const popupForm = document.querySelector(`.popup__form`);
const popupInput = document.querySelector(`.popup__input`);
const popups = document.querySelectorAll(`.popup`);
const changeAvatarImg = document.querySelector(`.profile__avatar-overlay`);
const closeAvatarPopup = popupAvatar.querySelector(`.popup__button-close`);

let userId;

const popupButtonSave = document.querySelectorAll(`.popup__button-save`);

for (const popup of popups) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains(`popup_visible`)) {
      closePopupField(popup);
    } else if (evt.target.classList.contains(`popup_visible`)) {
      closePopupField(popup);
    }
  });
};

editButtonPopup.addEventListener('click', ()=>{
  nameInput.value = nameReplacement.textContent;
  jobInput.value = jobReplacement.textContent;
  openPopupField(popupProfile);
});
formElementPlace.addEventListener('submit',submitFormPlace);
formElement.addEventListener('submit', submitFormProfile);
formAvatar.addEventListener('submit', submitFormAvatar);
closeAvatarPopup.addEventListener('click', ()=>closePopupField(popupAvatar));

addButtonPopup.addEventListener('click', ()=>{
  openPopupField(popupPlace);
  buttonEl.classList.add(validationParameters.inactiveButtonClass);
  buttonEl.textContent = 'Создать'
});
closePlacePopup.addEventListener('click', ()=>closePopupField(popupPlace));

closeProfilePopup.addEventListener('click', ()=>closePopupField(popupProfile));
closeImagePopup.addEventListener('click', ()=>closePopupField(popupImageContainer));
popupForm.addEventListener('submit',function (evt) {
   evt.preventDefault();
});

changeAvatarImg.addEventListener('click', ()=>{
  openPopupField(popupAvatar);
  buttonSaveAvatar.classList.add(validationParameters.inactiveButtonClass);
  buttonSaveAvatar.textContent = 'Создать'
});

export function renderProfile (data) {
  nameReplacement.textContent = data.name;
  jobReplacement.textContent = data.about;
  profileAvatar.src = data.avatar;
}

Promise.all([getProfileInfo(), getCards()])
  .then((data) => {
    renderProfile(data[0]);
    userId = data[0].id;
    const initialCards = data[1];
    for (const elem of initialCards){
      elements.append(createPlace(elem.likes, elem.link, elem.name, elem._id, elem.owner._id))
    }
  })
  .catch(err => {
    console.log(err)
});

enableValidation(validationParameters);