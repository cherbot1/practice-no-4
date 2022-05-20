import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit, inactiveButtonClass}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._saveButton = this._popup.querySelector('.popup__save-button');
        this._saveButtonDefaultText = this._saveButton.textContent;
        this._inactiveButtonClass = inactiveButtonClass;
    }

    /* Собираем данные из инпутов форм */
    _getInputValues() {
        const formValues = {};

        this._inputList.forEach((element) => {
            formValues[element.id] = element.value;
        });

        return formValues;
    }

    /* Метод для улучшения UX */
    renderLoading() {
        this._saveButton.textContent = 'Сохранение...';
    }

    /* Метод для улучшения UX */
    loadingFinished() {
        this._saveButton.textContent = this._saveButtonDefaultText;
    }

    /* Метод деактивации кнопки */
    changeButtonStateOnLoad() {
        if (!this._saveButton.classList.contains(this._inactiveButtonClass)) {
            this._saveButton.classList.add(this._inactiveButtonClass);
        } else {
            this._saveButton.classList.add(this._inactiveButtonClass);
        }
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
