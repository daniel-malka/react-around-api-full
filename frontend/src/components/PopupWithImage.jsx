import close from '../images/close-X.svg';
import '../blocks/popup.css';
function PopupWithImage(props) {
  return (
    <div className={`popup popup_type_image  ${props.isOpen && 'popup_open'}`}>
      <div className="popup__container-img popup__container_type_image">
        <span className=" popup__close-button_type_image" type="button">
          <img
            src={close}
            alt="close button"
            className="popup__close-img"
            onClick={props.onClose}
          />
        </span>
        <figure>
          <img
            src={props.card.link}
            alt={`picture of: ${props.card.name}`}
            className="popup__img"
          />
          <figcaption className="popup__title">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default PopupWithImage;
