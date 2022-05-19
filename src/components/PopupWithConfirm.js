import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, formSubmit){
        super (popupSelector);
        this._formSubmit = formSubmit;
        this._popupForm = this._popup.querySelector('.popup-confirm__form');
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._card);
        });
        super.setEventListeners();
    }
}