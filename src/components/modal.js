// Открытие попапа
function openPopupField (popup){
    popup.classList.add(`popup_visible`);
    document.addEventListener('keydown', closePopupOnEsc);
};
  
  // Закрытие попапа
function closePopupField (popup){
    popup.classList.remove(`popup_visible`);
    document.removeEventListener('keydown', closePopupOnEsc);
};
  
function closePopupOnEsc (evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector(`.popup_visible`);
      closePopupField(popup);
    };
};

export {openPopupField, closePopupField};