import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `${
    isOwn ? "gallery__bin" : "gallery__bin_disabled"
  }`;

  const isLikedByUser = card.likes.some((user) => user === currentUser._id);
  const cardLikeButtonClassName = `like__button ${
    isLikedByUser ? "button_liked" : ""
  }`;

  return (
    <li className="gallery__item">
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="gallery__img"
      />
      <span className={cardDeleteButtonClassName} onClick={handleCardDelete} />
      <div className="desc">
        <h2 className="desc__text">{card.name}</h2>
        <div className="like">
          <button
            type="button"
            aria-label="button"
            id="like__button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="like__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};
export default Card;
