import Api from "./Api";
import {api} from "../pages";
import * as constants from "../utils/constants.js"
export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._title = data.name;
        this._src = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._userId = data.userId;
        this._myId = data.myId;
        this._id = data._id;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click',  (evt) => {
            if (!evt.target.classList.contains('element__like-button_active')) {
                evt.target.classList.add('element__like-button_active');
                api.addLike(this._id)
                    .then((res) => {
                        this._changeLikesQuantity(res);
                    });
                this._likeCounter.textContent = this._likes.length;
            } else {
                evt.target.classList.remove('element__like-button_active');
                api.removeLike(this._id)
                    .then((res) => {
                        this._changeLikesQuantity(res);
                    });
                this._likeCounter.textContent = this._likes.length;
            }
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            constants.confirmPopup.classList.add('popup_opened');
            api.deleteCard(this._id);
            this._element.remove();
        });

        /* Используется внешняя функция обработчика клика по изображению (index.js) */
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._title, this._src);
        });
    }

    _changeLikesQuantity(data) {
        this._likeCounter.textContent = data.likes.length;
    }

    _isMyCard() {
        if (this._userId !== this._myId) {
            this._deleteButton.style.display = 'none';
        }
    }

    _hasMyLike() {
        const hasLike = this._likes.find((user) => {
            return user['_id'] === this._myId;
        });
        return hasLike;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._src;
        this._element.querySelector('.element__image').alt = this._alt;
        this._element.querySelector('.element__figcaption-text').textContent = this._title;
        this._likeCounter.textContent = this._likes.length;

        if (this._hasMyLike()) {
            this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        }

        this._isMyCard();

        return this._element;
    }
}



