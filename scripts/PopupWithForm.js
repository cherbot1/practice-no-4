import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach((element) => {
            this._formValues[element.id] = element.value;
        });

        return this._formValues;
    }

    close() {
        super.close();

        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._formSubmit(this._getInputValues());
        });
    }
}
