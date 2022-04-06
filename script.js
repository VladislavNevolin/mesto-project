const editButtonPopup = document.querySelector(`.profile__edit-button`);
const addButtonPopup = document.querySelector(`.profile__add-button`);
const closeProfilePopup = document.querySelector(`button[name='close-profile-button']`);
const closePlacePopup = document.querySelector(`button[name='close-place-button']`);
const closeImagePopup = document.querySelector(`button[name='close-image-button']`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupPlace = document.querySelector(`.place-popup`);
const popupImageContainer = document.querySelector(`.image-popup`);
const popup = document.querySelector(`.popup`);
const formElement = document.querySelector(`.popup__form`);
const formElementPlace = document.querySelector(`.popup__form-place`);
const nameInput = document.querySelector(`#title`);
const jobInput = document.querySelector(`#subtitle`);
const placeName = document.querySelector(`input[name='place-name']`);
const placeImageLink = document.querySelector(`input[name='place-image']`);
const nameReplacement = document.querySelector(`.profile__title`);
const jobReplacement = document.querySelector(`.profile__subtitle`);
const elementTemplate = document.querySelector(`#element-template`).content;
const elements = document.querySelector(`.elements`);
const popupImage = document.querySelector(`.popup__image`);
const popupCaption = document.querySelector(`.popup__caption`);



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

// Открытие попапа
function openPopupField (popup){
  popup.classList.add(`popup_visible`);
};

// Закрытие попапа
function closePopupField (popup){
  popup.classList.remove(`popup_visible`);
};

//Добавление карточек 
function addPlaces (elementTitle, elementImage) {
  const element = elementTemplate.querySelector(`.element`).cloneNode(true);
  const elementPlaceTitle = element.querySelector(`.element__title`);
  const elementPlaceImage = element.querySelector(`.element__image`);
  const likeButton = element.querySelector(`.element__button-heart`);
  const deleteButton = element.querySelector(`.element__button-delete`);
  
  elementPlaceTitle.textContent = elementTitle;
  elementPlaceImage.src = elementImage;
  elementPlaceImage.alt = elementTitle;
  
  likeButton.addEventListener('click', (evt)=> {
    evt.target.classList.toggle(`element__button-heart_active`);
  }); 

  deleteButton.addEventListener('click',(evt)=> {
    element.remove();
  });

  elementPlaceImage.addEventListener('click', (evt)=> {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopupField(popupImageContainer);
  })

  return element;
}

function addPlace(elementTitle, elementImage) {
  const place = addPlaces(elementTitle, elementImage);
  elements.prepend(place);
};

initialCards.forEach((item) => {
  addPlace(item.name, item.link);
});

// Изменение данных в попапе профиля
function formSubmitHandler (evt){
  evt.preventDefault();
  nameReplacement.textContent = nameInput.value;
  jobReplacement.textContent = jobInput.value;
  closePopupField(popup);
};

// Изменение данных в попапе карточки
function formSubmitPlace (evt){
  evt.preventDefault();
  const placeValue = placeName.value;
  const linkValue = placeImageLink.value;
  addPlace (placeValue,linkValue);
  closePopupField(popupPlace);
}

formElementPlace.addEventListener('submit',formSubmitPlace);
formElement.addEventListener('submit', formSubmitHandler);
addButtonPopup.addEventListener('click', ()=>openPopupField(popupPlace));
closePlacePopup.addEventListener('click', ()=>closePopupField(popupPlace));
editButtonPopup.addEventListener('click', ()=>openPopupField(popupProfile));
closeProfilePopup.addEventListener('click', ()=>closePopupField(popupProfile));
closeImagePopup.addEventListener('click', ()=>closePopupField(popupImageContainer));