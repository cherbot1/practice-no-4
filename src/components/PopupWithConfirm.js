import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, formSubmit){
        super (popupSelector);
        this._formSubmit = formSubmit;
        this._popupForm = this._popup.querySelector('.popup-confirm__form');
        this._saveButton = this._popup.querySelector('.popup__save-button');
        this._saveButtonDefaultText = this._saveButton.textContent;
    }

    /* Метод открытия со входящей информацией об открытой карточке */
    open(card) {
        this._card = card;
        super.open();
    }

    /* Метод для улучшения UX */
    renderLoading() {
        this._saveButton.textContent = 'Сохранение...';
    }

    /* Метод для улучшения UX */
    loadingFinished() {
        this._saveButton.textContent = this._saveButtonDefaultText;
    }

    /* Слушатель сабмита формы */
    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._card);
        });
        super.setEventListeners();
    }
}