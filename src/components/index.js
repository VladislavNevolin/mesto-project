import '../pages/index.css';

import {addPlace,popupImageContainer} from './card.js';
import {openPopupField, closePopupField} from './modal.js';
import {submitFormProfile, submitFormPlace, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement, validationParameters} from './utils.js';
import {enableValidation} from './validate.js';

const editButtonPopup = document.querySelector(`.profile__edit-button`);
const addButtonPopup = document.querySelector(`.profile__add-button`);
const closeProfilePopup = document.querySelector(`button[name='close-profile-button']`);
const closePlacePopup = document.querySelector(`button[name='close-place-button']`);
const closeImagePopup = document.querySelector(`button[name='close-image-button']`);

const formElement = document.querySelector(`.popup__form-profile`);
const formElementPlace = document.querySelector(`.popup__form-place`);

const popupForm = document.querySelector(`.popup__form`);
const popupInput = document.querySelector(`.popup__input`);
const popups = document.querySelectorAll(`.popup`);

// карточки для загрузки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  addPlace(item.name, item.link);
});

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
addButtonPopup.addEventListener('click', ()=>openPopupField(popupPlace));
closePlacePopup.addEventListener('click', ()=>closePopupField(popupPlace));

closeProfilePopup.addEventListener('click', ()=>closePopupField(popupProfile));
closeImagePopup.addEventListener('click', ()=>closePopupField(popupImageContainer));
popupForm.addEventListener('submit',function (evt) {
   evt.preventDefault();
});

enableValidation(validationParameters);
