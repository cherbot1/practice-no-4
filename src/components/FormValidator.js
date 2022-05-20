export class FormValidator {
    constructor(param, form) {
        this._form = form;
        this._input = param.inputSelector;
        this._submitButtonSelector = param.submitButtonSelector;
        this._inactiveButtonClass = param.inactiveButtonClass;
        this._inputErrorClass = param.inputErrorClass;
        this._errorClass = param.errorClass;
        this._inputsArray = Array.from(this._form.querySelectorAll(this._input));
        this._exactSubmitButton = this._form.querySelector(this._submitButtonSelector);
    }

    /* Изменяем состояние кнопки */
    _changeButtonState = () => {
        if (!this._form.checkValidity()){
            this._deactivateButton(this._exactSubmitButton);
        } else {
            this._activateButton(this._exactSubmitButton);
        }
    }

    /* Вешаем слушателей на ввод информации */
    _setEventListeners = () => {
        this._form.addEventListener('input', (e) => {
            const exactInput = e.target;

            this._changeButtonState();
            this._changeErrorState(exactInput);
        });
    }

    /* Проверка правильности заполнения формы и отображение ошибок в инпутах с блокировкой кнопок */
    _isValid = (element) => {
        const errorMessage = document.querySelector(`#${element.id}-error`);

        if (!element.checkValidity()) {
            element.classList.add(this._inputErrorClass);
            errorMessage.classList.add(this._errorClass);
            errorMessage.textContent = element.validationMessage;
        } else {
            this._hideErrors(element);
        }
    }

    /* Функция для скрытия ошибок, используется в сбросе валидации и в проверке правильности с последующим навешиванием */
    _hideErrors = (element) => {
        const errorMessage = document.querySelector(`#${element.id}-error`);

        element.classList.remove(this._inputErrorClass);
        errorMessage.classList.remove(this._errorClass);
        errorMessage.textContent = '';
    }

    /* Функция для активации кнопки, используется в сбросе валидации и в изменении состояния кнопки */
    _activateButton = (button) => {
        button.disabled = false;
        button.classList.remove(this._inactiveButtonClass);
    }

    /* Метод деактивации кнопки для форм с изображениями */

    _deactivateButton = (button) => {
        this._exactSubmitButton.disabled = true;
        this._exactSubmitButton.classList.add(this._inactiveButtonClass);
    }

    /* Функция для изменения состояния инпутов в случае ошибки */
    _changeErrorState = (input) => {
        this._isValid(input);
    }

    /* Функция сброса ошибок */
    _resetErrors = () => {
        this._inputsArray.forEach((element) => {
            if (element.classList.contains(this._inputErrorClass) || element.checkValidity()) {
                this._hideErrors(element);
            }
        });
    }

    /* Публичная функция для активации валидации формы */
    enableValidation = () => {
        this._setEventListeners();
    }

    /* Сброс валидации */
    /* Простите, я тупенький - после первого ревью не понял, что необходимо было сделать */
    resetValidation = () => {
        if (this._form.classList.contains('popup-add__form') || this._form.classList.contains('popup-change-avatar__form')) {
            this._deactivateButton(this._exactSubmitButton);

            this._resetErrors();
        } else {
            this._activateButton(this._exactSubmitButton);

            this._resetErrors();
        }
    }
}