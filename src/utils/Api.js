class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleReply(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this._handleReply)
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this._handleReply)
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
      .then(this._handleReply)
  }

  updateUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({ avatar })
      })
      .then(this._handleReply)
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      })
      .then(this._handleReply)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleReply)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'PUT',
          headers: this._headers,
        })
        .then(this._handleReply)
    } else {
      return fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._handleReply)
    }
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    "Content-Type": "application/json",
    "authorization": "abeb6987-1131-4a8c-8e13-4ece746c8e7b",
  }
})

export default api;