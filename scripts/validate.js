enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible'
});

function enableValidation(param) {
    const form = document.querySelector(param.formSelector);

    form.addEventListener('input', function(evt) {
        listenFormInput(evt, param);
    })
}

function listenFormInput(evt, param) {
    const input = evt.target;


}


function showError(param) {
    const currentInput = document.querySelector(param.inputSelector);

    currentInput.classList.add('popup__input_error');
}

function hideError(input) {
    const currentInput = document.querySelector(param.inputSelector);

    currentInput.classList.remove('popup__input_error');
}

