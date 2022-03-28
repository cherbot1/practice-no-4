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
        
    })
}






