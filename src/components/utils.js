import {closePopupField} from './modal.js';
import {createPlace,elements} from './card.js';
import {toggleButtonState} from './validate.js'
import {checkResult,changeProfile,postCard,changeAvatar } from './api.js';
import {renderProfile,formAva,formEl,validationParameters} from './index.js'
const formElement = document.querySelector(`.popup__form-profile`);

const placeName = document.querySelector(`input[name='place-name']`);
const placeImageLink = document.querySelector(`input[name='place-image']`);
const nameInput = document.querySelector(`#title`);
const jobInput = document.querySelector(`#subtitle`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupPlace = document.querySelector(`.place-popup`);
const nameReplacement = document.querySelector(`.profile__title`);
const jobReplacement = document.querySelector(`.profile__subtitle`);
const profileAvatar = document.querySelector(`.profile__avatar`);
const popupButtonSave = popupProfile.querySelector(`.popup__button-save`);
const popupProfileForm = popupProfile.querySelector(`.popup__form-profile`);

const buttonEl = popupPlace.querySelector('.popup__button-save');
const formEditProfileTitleInput = formElement.elements.title;
const formEditProfileSubtitleInput = formElement.elements.subtitle;

const formAvatar = document.querySelector(`.popup__form-avatar`)
const popupAvatar = document.querySelector(`.avatar-popup`);
const buttonSaveAvatar = popupAvatar.querySelector(`.popup__button-save`);
const avatarLink = popupAvatar.querySelector(`.popup__input`);




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

export {buttonEl,buttonSaveAvatar,popupAvatar,formAvatar,submitFormAvatar,formElement,submitFormProfile,submitFormPlace, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement, profileAvatar,popupProfileForm};