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

const validationParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_type_active'
  };





export {placeName,placeImageLink,popupButtonSave,formEditProfileTitleInput,formEditProfileSubtitleInput,avatarLink,validationParameters,buttonEl,buttonSaveAvatar,popupAvatar,formAvatar,formElement, nameInput, jobInput, popupProfile, popupPlace, nameReplacement, jobReplacement, profileAvatar,popupProfileForm};