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

    _changeButtonState = () => {
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        if (!this._form.checkValidity()){
            submitButton.disabled = true;
            submitButton.classList.add(this._inactiveButtonClass);
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove(this._inactiveButtonClass);
        }
    }

    _setEventListeners = () => {
        this._form.addEventListener('input', (e) => {
            const exactInput = e.target;

            this._changeButtonState();
            this._changeErrorState(exactInput);
        });
    }

    _changeErrorState = (input) => {
        const errorMessage = document.querySelector(`#${input.id}-error`);

        if (!input.checkValidity()){
            input.classList.add(this._inputErrorClass);
            errorMessage.classList.add(this._errorClass);
            errorMessage.textContent = input.validationMessage;
        }
        else{
            input.classList.remove(this._inputErrorClass);
            errorMessage.classList.remove(this._errorClass);
            errorMessage.textContent = '';
        }
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    resetValidation = () => {
        this._changeButtonState();
        this._inputsArray.forEach((element) => {
            const errorMessage = document.querySelector(`#${element.id}-error`);

            if (element.classList.contains(this._inputErrorClass)) {
                element.classList.remove(this._inputErrorClass);
                errorMessage.classList.remove(this._errorClass);
            }
        });
    }
}