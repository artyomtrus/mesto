export class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
		this._body = config.body;
	}

	getCards() {
		return fetch(`${this._baseUrl}/v1/cohort-44/cards`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	getUserId() {
		return fetch(`${this._baseUrl}/v1/cohort-44/users/me`, {
			method: 'GET',
			headers: this._headers,
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	setUserId(data) {
		return fetch(`${this._baseUrl}/v1/cohort-44/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(data),
		}
		)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	createCard(data) {
		return fetch(`${this._baseUrl}/v1/cohort-44/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link,
				likes: data.likes,
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		}
		)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	putLike(id) {
		return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		}
		)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	deleteLike(id) {
		return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		}
		)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
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
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}
}
