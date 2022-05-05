import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    /* Собираем данные из инпутов форм */
    _getInputValues() {
        const formValues = {};

        this._inputList.forEach((element) => {
            formValues[element.id] = element.value;
        });

        return formValues;
    }

    /* Переписан метод для сброса валидации формы */
    close() {
        super.close();

        this._popupForm.reset();
    }

    /* Переписан метод для предотвращения обновления страницы и сбору данных из инпутов при сабмите формы */
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._formSubmit(this._getInputValues());
        });
    }
}
