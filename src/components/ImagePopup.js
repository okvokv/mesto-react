//гибридный элемент - всплывающее окно с картинкой ===========================
function ImagePopup (props) {
   
  return (
    <div className={`popup popup_type_image ${props.opened && 'popup_opened'}`}>
      <figure className="popup__container">

        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={props.onClose} > 
        </button>

        <img
          className="popup__image"
          src={`${props.selectedCard.link}`}
          alt={`Фото: ${props.selectedCard.name}`}
        />

        <figcaption className="popup__image-text">{props.selectedCard.name}</figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;