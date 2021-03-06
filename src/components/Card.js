export default class Card {
    constructor(data, templateSelector, handleCardClick, handleCardDelete, handleLike) {
        this._title = data.name;
        this._src = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._userId = data.userId;
        this._myId = data.myId;
        this._id = data._id;
        this._handleCardDelete = handleCardDelete;
        this._handleLike = handleLike;
    }

    /* Получаем шаблон */
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    /* Вешаем слушателей */
    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click',  (evt) => {
            this._handleLike(evt, this);
        });

        this._deleteButton.addEventListener('click', () => {
           this._handleCardDelete(this);
        });

        /* Используется внешняя функция обработчика клика по изображению (index.js) */
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._title, this._src);
        });
    };

    /* Меняем отображение количества лайков */
    _changeLikesQuantity(data) {
        this._likeCounter.textContent = data.likes.length;
    };

    /* Проверка владельца карточки */
    _isMyCard() {
        if (this._userId !== this._myId) {
            this._deleteButton.style.display = 'none';
        }
    };

    /* Проверка наличия моего лайка */
    _hasMyLike() {
        const hasLike = this._likes.find((user) => {
            return user._id === this._myId;
        });
        return hasLike;
    };

    /* Функция удаления карточки со страницы */
    deleteCard() {
        this._element.remove();
        this._element = null;
    };

    /* Создание карточки */
    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton =  this._element.querySelector('.element__delete-button');
        this._likeCounter =  this._element.querySelector('.element__like-counter');
        this._image = this._element.querySelector('.element__image');
        this._setEventListeners();

        this._image.src = this._src;
        this._image.alt = this._alt;
        this._element.querySelector('.element__figcaption-text').textContent = this._title;
        this._likeCounter.textContent = this._likes.length;

        if (this._hasMyLike()) {
            this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        }

        this._isMyCard();

        return  this._element;
    };
}



