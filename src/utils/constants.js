/* Данные для дефолтных карточек */
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/* Параметры для валидатора */
export const formValidationParam = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_not-valid',
    errorClass: 'popup__input-error'
};

/* Константы */
export const cardsListSelector = '.elements__list';
export const popupImageSelector = '.popup-image';
export const popupEditSelector = '.popup-edit';
export const popupAddSelector = '.popup-add';
export const nameSelector = '.profile__name';
export const aboutSelector = '.profile__subtitle';
export const nameInput = document.querySelector('.popup__input_name');
export const subtitleInput = document.querySelector('.popup__input_subtitle');
export const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
export const buttonOpenAddPopup = document.querySelector('.profile__add-button');
export const addForm = document.querySelector('.popup-add__form');
export const editForm = document.querySelector('.popup-edit__form');