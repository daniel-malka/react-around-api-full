import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoToolTip";
import PopupWithImage from "./PopupWithImage";
import DeletePopupForm from "./DeletePopupForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

import api from "../utils/Api";
import { signUp, signIn, checkToken } from "../utils/Auth";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isImgViewOpen, setIsImgViewOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const [email, setEmail] = useState({ email: "email@email.com" });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSignUp = (email, password) => {
    signUp(email, password)
      .then((res) => {
        localStorage.setItem("email", res.user.email);
        if (res.user._id) {
          history.push("/signin");
          setTooltipStatus(true);
        }
      })
      .catch((err) => {
        localStorage.removeItem("email");
        console.log(err);
        setTooltipStatus(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(false);
      });
  };

  const handleLogin = ({ userData }) => {
    signIn({ email: userData.getEmail, password: userData.password })
      .then((res) => {
        setCurrentUser(res.user);
        if (res.token) {
          setIsLoggedIn(true);
          localStorage.setItem("token", res.token);
          setToken(res.token);
          setEmail(userData.getEmail);
          history.push("/");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  //token check
  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem("token")) {
        checkToken(token)
          .then((res) => {
            if (res.user._id) {
              setEmail(res.data.email);
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
            history.push("/signin");
          })
          .finally(() => {
            setIsCheckingToken(false);
          });
      } else {
        setIsCheckingToken(false);
      }
    }
  }, [token, history]);

  useEffect(() => {
    if (isLoggedIn) {
      if (token) {
        api
          .getUserInfo(token)
          .then((user) => {
            if (user) {
              setCurrentUser(user);
            }
          })
          .catch((err) => console.log(err));

        api
          .getCards(token)
          .then((res) => {
            setCards(res);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [isLoggedIn, token]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/signin");
  };

  useEffect(() => {
    const closeByEvents = (e) => {
      if (e.key === "Escape" || e.target.classList.contains("popup_open")) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEvents);
    document.addEventListener("click", closeByEvents);

    return () => {
      document.removeEventListener("keydown", closeByEvents);
      document.removeEventListener("click", closeByEvents);
    };
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id);
    if (isLiked) {
      api
        .dislikeCard(card._id, token)
        .then((likedCard) => {
          const newCards = cards.map((card) => {
            return card._id === likedCard._id ? likedCard : card;
          });
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeCard(card._id, token)
        .then((likedCard) => {
          const newCards = cards.map((card) => {
            return card._id === likedCard._id ? likedCard : card;
          });
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardOpen(true);
  }

  function handleCardClick(card) {
    setIsImgViewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsEditAvatarOpen(false);
    setIsImgViewOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCard(selectedCard._id, token)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about }, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleEyeIcon = () => {
    const eye = document.querySelector(".auth-form__input-password");

    eye.classList.toggle("auth-form__password-holder-active");
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          handleSignout={handleLogout}
        />
        <ProtectedRoute
          path="/"
          isLoggedIn={isLoggedIn}
          isCheckingToken={isCheckingToken}
        >
          <Main
            cards={cards}
            onEditProfileClick={handleEditProfileClick}
            onAddCardClick={handleAddCardClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteClick}
            onCardLike={handleCardLike}
          />
        </ProtectedRoute>
        {isLoggedIn ? (
          <>
            <EditProfilePopup
              title="Edit Profile"
              name="edit"
              isOpen={isEditProfileOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              title="New Place"
              name="img-add"
              isOpen={isAddCardOpen}
              onClose={closeAllPopups}
              onSubmit={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarOpen}
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closeAllPopups}
            />
            <DeletePopupForm
              isOpen={isDeletePopupOpen}
              onSubmit={handleCardDelete}
              onClose={closeAllPopups}
            />
            <PopupWithImage
              card={selectedCard}
              isOpen={isImgViewOpen}
              onClose={closeAllPopups}
            />
          </>
        ) : (
          <div>
            <Switch>
              <Route path="/signup">
                <Register
                  handleSignUp={handleSignUp}
                  handleEyeIcon={handleEyeIcon}
                />
              </Route>

              <Route path="/signin">
                <Login
                  handleLogin={handleLogin}
                  handleEyeIcon={handleEyeIcon}
                />
              </Route>

              <Route>
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
              </Route>
            </Switch>
          </div>
        )}
        {isLoggedIn ? (
          ""
        ) : (
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            bool={tooltipStatus}
          />
        )}{" "}
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
