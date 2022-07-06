export class UserInfo {
	constructor({ nameSelector, aboutSelector, avatarSelector }) {
		this._name = document.querySelector(nameSelector);
		this._about = document.querySelector(aboutSelector);
		this._avatar = document.querySelector(avatarSelector)
	};

	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._about.textContent
		}
	}

	setUserId(id) {
		this._userId = id;
	}

	getUserId() {
		return this._userId;
	}

	setAvatar(data) {
		this._avatar.style.backgroundImage = `url(${data.avatar})`;
	}

	setUserInfo(data) {
		this._name.textContent = data.name;
		this._about.textContent = data.about;
	}
}