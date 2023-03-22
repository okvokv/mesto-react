//параметры подключения: 
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-59';
const headers = { 'Content-Type': 'application/json' };

class Auth {
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

	//метод регистрации пользователя
	registrate(_email, _password) {
		return this._request('signup', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: _email,
				password: _password
			})
		})
	};

	//метод авторизации зарегистрированного пользователя
	logIn(_email, _password) {
		return this._request('signin', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: _email,
				password: _password
			})
		})
	};

	//метод аутентификации(отправки жетона для проверки)
	checkToken(_token) {
		return this._request('users/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${_token}`,
				'Content-Type': 'application/json'
			}
		})
	};

};

//инициализация класса авторизации
const auth = new Auth(baseUrl, headers);

export default auth;