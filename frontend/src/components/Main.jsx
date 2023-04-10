import React from 'react';

import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';


function Main({
  cards,
  onEditProfileClick,
  onCardClick,
  onEditAvatarClick,
  onAddCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="top">
        <div className="top__container" onClick={onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="user avatar"
            className="top__img"
          />
        </div>

        <div className="text">
          <div className="text__title">
            <h1 className="text__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="button"
              onClick={onEditProfileClick}
              className="text__edit"
            />
          </div>
          <p className="text__about">{currentUser.about}</p>
        </div>

        <button
          type="button"
          aria-label="button"
          className="top__plus-box"
          onClick={onAddCardClick}
        />
      </section>
      <section className="images">
        <ul className="gallery">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
