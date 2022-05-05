import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup-image__image');
        this._popupSubtitle = this._popup.querySelector('.popup-image__subtitle');
    }

    /* Переписан оригинальный публичный метод из popup для получения данных из карточки */
    open(alt, src) {
        this._popupImage.src = src;
        this._popupImage.alt = alt;
        this._popupSubtitle.textContent = alt;

        super.open();
    }
}