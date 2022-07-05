import '../pages/index.css';


import {openPopupField, closePopupField} from './modal.js';
import {placeName,placeImageLink,popupButtonSave,formEditProfileTitleInput,formEditProfileSubtitleInput,avatarLink,validationParameters,buttonEl,buttonSaveAvatar,popupAvatar,formElement, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement,profileAvatar,popupProfileForm,formAvatar} from './utils.js';
import {enableValidation,toggleButtonState} from './validate.js';
import { getProfileInfo, getCards,checkResult,changeProfile,postCard,changeAvatar } from './api.js';
import { popupImageContainer,elements,createPlace,formElementPlace } from './card.js';


const editButtonPopup = document.querySelector(`.profile__edit-button`);
const addButtonPopup = document.querySelector(`.profile__add-button`);
const closeProfilePopup = document.querySelector(`button[name='close-profile-button']`);
const closePlacePopup = document.querySelector(`button[name='close-place-button']`);
const closeImagePopup = document.querySelector(`button[name='close-image-button']`);
const popups = document.querySelectorAll(`.popup`);
const changeAvatarImg = document.querySelector(`.profile__avatar-overlay`);
const closeAvatarPopup = popupAvatar.querySelector(`.popup__button-close`);
export const formEl = Array.from(popupPlace.querySelectorAll(validationParameters.inputSelector));
export const formAva = Array.from(popupAvatar.querySelectorAll(validationParameters.inputSelector));
export let userId;

// Изменение данных в попапе профиля
function submitFormProfile (evt){
  evt.preventDefault();
  popupButtonSave.textContent = 'Сохранение...';
  changeProfile(formEditProfileTitleInput.value, formEditProfileSubtitleInput.value)
    .then(()=>{
        nameReplacement.textContent = nameInput.value;
        jobReplacement.textContent = jobInput.value;
        closePopupField(popupProfile);
    })
    .catch(err => console.log(err))
    
    .finally(() => {
        popupButtonSave.textContent = 'Сохранить'
  });
};

// Изменение данных в попапе карточки
function submitFormPlace (evt){
  evt.preventDefault();
  buttonEl.textContent = 'Сохранение...';
  postCard(placeName.value,placeImageLink.value)
      .then((data)=>{
          elements.prepend(createPlace(data.likes, data.link, data.name, data._id, data.owner._id));
          evt.target.reset();
          closePopupField(popupPlace);
      })
      .catch((err)=>{
          console.log(`Ошибка при добавлении карточки: ${err}`);
      })
      .finally(() => {
          buttonEl.textContent = 'Создать';
      });
  toggleButtonState(formEl, buttonEl, validationParameters); // Исправление ошибки с активной кнопкой сохранить на 2 и последующих вызовах попапа добавления карточки
}

// Изменение аватарки
function submitFormAvatar (evt){
  evt.preventDefault();
  buttonSaveAvatar.textContent = 'Сохранение...';
  changeAvatar(avatarLink.value)
      .then((data)=>{
          renderProfile(data);
          evt.target.reset();
          closePopupField(popupAvatar);
      })
      .catch((err)=>{
          console.log(`Ошибка при изменении аватарки: ${err}`);
      })
      .finally(() => {
          buttonSaveAvatar.textContent = 'Создать';
      });
  
  toggleButtonState(formAva,buttonSaveAvatar,validationParameters);
}

for (const popup of popups) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains(`popup_visible`)) {
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
    userId = data[0]._id;
    const initialCards = data[1];
    for (const elem of initialCards){
      elements.append(createPlace(elem.likes, elem.link, elem.name, elem._id, elem.owner._id))
    }
  })
  .catch(err => {
    console.log(err)
});

enableValidation(validationParameters);
