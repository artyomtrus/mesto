export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._body = config.body;
    this._getResponseData = this._getResponseData.bind(this);
  }

  getCards() {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  getUserId() {
    return fetch(`${this._baseUrl}/v1/cohort-44/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getResponseData)
  }

  setUserId(data) {
    return fetch(`${this._baseUrl}/v1/cohort-44/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }
    )
      .then(this._getResponseData);
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }
    )
      .then(this._getResponseData);
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }
    )
      .then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }
    )
      .then(this._getResponseData);
  }

  createNewAvatar(data) {
    return fetch(`${this._baseUrl}/v1/cohort-44/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }
    )
      .then(
        this._getResponseData
      );
  }

  _getResponseData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
