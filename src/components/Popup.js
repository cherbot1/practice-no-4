export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupWithEsc = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupWithEsc);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupWithEsc);
    }

    /* Слушатели для закрытия popup по клику на крестик и по клику на оверлей */
    setEventListeners() {
        const popupCloseButton = this._popup.querySelector('.popup__close');

        popupCloseButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')){
                this.close();
            }
        })
    }


}