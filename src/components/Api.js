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
        return fetch(`https://${this._url}users/me`, {
            headers: this._headers
        })
            .then(this._errorHandler)
    }

    getCardsInfo() {
        return fetch(`https://mesto.${this._url}cards`, {
            headers: this._headers
        })
            .then(this._errorHandler)
    }

    changeUserInfo(data) {
        return fetch(`https://mesto.${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data['name-input'],
                about: data['about-input']
            })
        })
            .then(this._errorHandler)
    }

    addCard(data) {
        return fetch(`https://mesto.${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data['place-name-input'],
                link: data['url-input']
            })
        })
            .then(this._errorHandler)
    }
}