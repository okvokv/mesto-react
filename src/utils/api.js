//параметры подключения: 
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-59';
const headers = {
	Authorization: 'ba4cd59f-b9e5-45d4-a657-2ca4f8fa9389',
	'Content-Type': 'application/json'
};
class Api {
	constructor(baseUrl, headers) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	};

	//общая часть запроса и его обработки
	_request(_endUrl, _options) {
		return fetch(`${this._baseUrl}/${_endUrl}`, _options)
			.then(res => {
				if (res.ok) {
					//если запрос выполнен
					return res.json();
				}
				//если сервер вернул ошибку, отклонить промис
				return Promise.reject(`Ошибка: ${res.status}`)
			})
	};

	//метод получения данных пользователя
	_getUserData() {
		return this._request('users/me', {
			method: 'GET',
			headers: this._headers
		})
	};

	//метод получения массива карточек с сервера
	getAllCardsData() {
		return this._request('cards', {
			method: 'GET',
			headers: this._headers
		})
	};

	//метод получения начальных данных (общий)
	getInitialData() {
		return Promise.all([this._getUserData(), this.getAllCardsData()])
	};

	//метод замены аватара пользователя	
	setAvatar(_link) {
		return this._request('users/me/avatar', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: _link
			})
		})
	};

	//метод сохранения данных пользователя в профиль на сервер
	setUserInfo(_name, _description) {
		return this._request('users/me', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: _name,
				about: _description
			})
		})
	};

	//метод добавления новой карточки на сервер и получения информации о результате
	addNewCard(_cardName, _cardLink) {
		return this._request('cards', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: _cardName,
				link: _cardLink
			})
		})
	};

	//метод удаления своей карточки на сервере и получения информации о результате
	deleteCard(_cardId) {
		return this._request(`cards/${_cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
	};

	//метод установки лайка и получения данных о результате
	setLike(_cardId) {
		return this._request(`cards/${_cardId}/likes`, {
			method: 'PUT',
			headers: this._headers
		})
	};

	//метод удаления лайка (поставленного пользователем)
	deleteLike(_cardId) {
		return this._request(`cards/${_cardId}/likes`, {
			method: 'DELETE',
			headers: this._headers
		})
	};

};

//инициализация класса запросов к серверу
const api = new Api(baseUrl, headers);

export default api;