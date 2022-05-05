export class Card {

    constructor(title, src, templateSelector, handleCardClick) {
        this._title = title;
        this._src = src;
        this._alt = title;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
            evt.target.classList.toggle('element__like-button_active');
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._element.remove();
        });

        /* Используется внешняя функция обработчика клика по изображению (index.js) */
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._title, this._src);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._src;
        this._element.querySelector('.element__image').alt = this._alt;
        this._element.querySelector('.element__figcaption-text').textContent = this._title;

        return this._element;
    }
}



