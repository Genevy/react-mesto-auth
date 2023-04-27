class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  /* Обработать ответ */
  _handleReply(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  /* Загрузить данные пользователя с сервера */
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this._handleReply)
  }

  /* Загрузить все карточки с сервера */
  getAllCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this._handleReply)
  }

  /* Редактировать профиль */
  updateUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
      .then(this._handleReply)
  }

  /* Обновить аватар */
  updateUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({ avatar })
      })
      .then(this._handleReply)
  }

  /* Добавить новую карточку */
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      })
      .then(this._handleReply)
  }

  /* Удалить карточку */
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleReply)
  }

  /* Поставить и удалить лайк */
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