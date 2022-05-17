export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _errorHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Возникла ошибка ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        })
            .then(this._errorHandler)
    }

    getCardsInfo() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        })
            .then(this._errorHandler)
    }
}