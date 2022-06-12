import {openPopupField} from './modal.js';

const elementTemplate = document.querySelector(`#element-template`).content;
const elements = document.querySelector(`.elements`);
const popupImage = document.querySelector(`.popup__image`);
const popupCaption = document.querySelector(`.popup__caption`);
const popupImageContainer = document.querySelector(`.image-popup`);

//Добавление карточек 
function createPlace (elementTitle, elementImage) {
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
    const place = createPlace(elementTitle, elementImage);
    elements.prepend(place);
};

export{createPlace,addPlace,popupImageContainer};
