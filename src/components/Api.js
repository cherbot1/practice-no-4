export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    /* Обработка ответа */
    _responseCheck(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Возникла ошибка ${res.status}`);
        }
    }

    /* Получение информации о пользователе с сервера */
    getUserInfo() {
        return fetch(`https://${this._url}users/me`, {
            headers: this._headers
        })
            .then(this._responseCheck)
    }

    /* Получение информации о карточках с сервера */
    getCardsInfo() {
        return fetch(`https://mesto.${this._url}cards`, {
            headers: this._headers
        })
            .then(this._responseCheck);
    }

    /* Изменение информации о пользователе на сервере */
    changeUserInfo(data) {
        return fetch(`https://mesto.${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data['name-input'],
                about: data['about-input']
            })
        })
            .then(this._responseCheck);
    }

    /* Добавление новой карточки на сервер*/
    addCard(data) {
        return fetch(`https://mesto.${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data['place-name-input'],
                link: data['url-input']
            })
        })
            .then(this._responseCheck);
    }

    /* Удаление карточки с сервера */
    deleteCard(id) {
        return fetch(`https://mesto.${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._responseCheck);
    }

    /* Добавляем лайк на сервер */
    addLike(id) {
        return fetch(`https://mesto.${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._responseCheck);

    }

    /* Убираем лайк с сервера */
    removeLike(id) {
        return fetch(`https://mesto.${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._responseCheck);
    }

    /* Меняем информацию об аватаре на сервере */
    changeAvatar(data) {
        return fetch(`https://mesto.${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data['avatar-url-input'],
            })
        })
            .then(this._responseCheck);
    }
}