import { BASE_URL, BASE_URL2, customFetch } from "./constants-and-rep-code";

export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getCards(token) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getUserInfo(token) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo({ name, about }, token) {
    console.log("token", token);
    return customFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard({ name, link, owner }, token) {
    return customFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
        owner: owner,
      }),
    });
  }
  editAvatar(avatar, token) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
  deleteCard(cardId, token) {
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  dislikeCard(id, token) {
    return customFetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  likeCard(id, token) {
    return customFetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});
export default api;
