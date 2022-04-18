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
    const errorMessage = document.querySelector(`#${input.id}-error`);

    if (!input.checkValidity()){
        input.classList.add(param.inputErrorClass);
        errorMessage.classList.add(param.errorClass);
        errorMessage.textContent = input.validationMessage;
    }
    else{
        input.classList.remove(param.inputErrorClass);
        errorMessage.classList.remove(param.errorClass);
        errorMessage.textContent = '';
    }
}


