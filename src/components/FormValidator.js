export class FormValidator {
    constructor(param, form) {
        this._form = form;
        this._input = param.inputSelector;
        this._submitButtonSelector = param.submitButtonSelector;
        this._inactiveButtonClass = param.inactiveButtonClass;
        this._inputErrorClass = param.inputErrorClass;
        this._errorClass = param.errorClass;
        this._inputsArray = Array.from(this._form.querySelectorAll(this._input));
    }

    /* Изменяем состояние кнопки */
    _changeButtonState = () => {
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        if (!this._form.checkValidity()){
            submitButton.disabled = true;
            submitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._activateButton(submitButton);
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

    /* Функция для изменения состояния инпутов в случае ошибки */
    _changeErrorState = (input) => {
        this._isValid(input);
    }

    /* Публичная функция для активации валидации формы */
    enableValidation = () => {
        this._setEventListeners();
    }

    /* Сброс валидации */
    resetValidation = () => {
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        this._activateButton(submitButton);

        this._inputsArray.forEach((element) => {
            if (element.classList.contains(this._inputErrorClass) || element.checkValidity()) {
                this._hideErrors(element);
            }
        });
    }
}