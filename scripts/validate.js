enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_not-valid',
    errorClass: 'popup__input-error'
});

function enableValidation(param) {
    const allForms = document.querySelectorAll(param.formSelector);

    for (let i = 0; i < allForms.length; i++){
        allForms[i].addEventListener('input', (evt) => {
            const currentForm = evt.currentTarget;
            const exactInput = evt.target;

            changeButtonState(currentForm, param);
            changeErrorState(exactInput, param);
        });
    }
}

function changeButtonState(form, param) {
    const submitButton = form.querySelector(param.submitButtonSelector);

    if (!form.checkValidity()){
        submitButton.disabled = true;
        submitButton.classList.add(param.inactiveButtonClass);
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove(param.inactiveButtonClass);
    }
}

function changeErrorState(input, param) {
    const inputForValidation = document.querySelector(`#${input.id}`);
    const errorMessage = document.querySelector(`#${input.id}-error`);

    if (!input.checkValidity()){
        inputForValidation.classList.add(param.inputErrorClass);
        errorMessage.classList.add(param.errorClass);
        errorMessage.textContent = input.validationMessage;
    }
    else{
        inputForValidation.classList.remove(param.inputErrorClass);
        errorMessage.classList.remove(param.errorClass);
        errorMessage.textContent = '';
    }
}


