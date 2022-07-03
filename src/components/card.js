import {openPopupField} from './modal.js';
import {deleteCard,setLike,deleteLike,checkResult} from './api.js';
import {userId} from './index.js'

const elementTemplate = document.querySelector(`#element-template`).content;
const elements = document.querySelector(`.elements`);
const popupImage = document.querySelector(`.popup__image`);
const popupCaption = document.querySelector(`.popup__caption`);
const popupImageContainer = document.querySelector(`.image-popup`);

const formElementPlace = document.querySelector(`.popup__form-place`)

//Добавление карточек 
function createPlace (likes, link, name, cardId, owner) {
    const element = elementTemplate.querySelector(`.element`).cloneNode(true);
    const elementPlaceTitle = element.querySelector(`.element__title`);
    const elementPlaceImage = element.querySelector(`.element__image`);
    const elementButtonLike = element.querySelector(`.element__button-heart`);
    const elementButtonDelete = element.querySelector(`.element__button-delete`);
    const elementTheme = element.querySelector(`.element__theme`);

    elementPlaceTitle.textContent = name;
    elementPlaceImage.src = link;
    elementPlaceImage.alt = name;
    elementPlaceImage.addEventListener('click', (evt)=>{
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      popupCaption.textContent = evt.target.alt;
      openPopupField(popupImageContainer);
    });
    element.id = cardId;
    
    elementButtonDelete.addEventListener('click', (evt) =>{
      const element = evt.target.closest(`.element`);
      deleteCard(element.id)
        .then(element.remove())
        .catch(err=>
          console.log(err)
        );
    });

    elementButtonLike.addEventListener('click',(evt) => {
      const element = evt.target.closest(`.element`);
      if (elementButtonLike.classList.contains('element__button-heart_active')) {
        deleteLike(element.id)
          .then((data)=>{
            element.querySelector(`.element__button-heart-counter`).textContent = data.likes.length;
            elementButtonLike.classList.remove('element__button-heart_active');
          })
          .catch(err =>
            console.log(err)
          );
      } else {
        setLike(element.id)
          .then((data) =>{
            elementTheme.querySelector(`.element__button-heart-counter`).textContent = data.likes.length;
            elementButtonLike.classList.add('element__button-heart_active');
          })
          .catch(err =>
            console.log(err)
          );
      }
    });
    if(owner !== userId) {
      elementButtonDelete.remove();
    }
    elementTheme.querySelector(`.element__button-heart-counter`).textContent = likes.length;
    if(likes.some((item) => item._id === userId)) {
      elementButtonLike.classList.add(`element__button-heart_active`);
    }
    return element;
    
}

function addPlace(likes, link, name, cardId, owner) {
    const place = createPlace(likes, link, name, cardId, owner);
    elements.prepend(place);
};

export{addPlace,createPlace,popupImageContainer,elements,formElementPlace};
