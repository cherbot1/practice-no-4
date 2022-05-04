import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


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
const formValidationParam = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_not-valid',
    errorClass: 'popup__input-error'
};


const cardsContainer = document.querySelector('.elements__list');
const cardsListSelector = '.elements__list';
const popupImageSelector = '.popup-image';
const popupEditSelector = '.popup-edit';
const popupAddSelector = '.popup-add';
const nameInput = document.querySelector('.popup__input_name');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const popupEditSaveChanges = document.querySelector('.popup-edit__form');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const popupAddSaveChanges = document.querySelector('.popup-add__form');
const cardNameInput = document.querySelector('.popup-add__input_name');
const cardLinkInput = document.querySelector('.popup-add__input_link');
const popupAddCloseButton = document.querySelector('.popup-add__close');
const popupEditCloseButton = document.querySelector('.popup-edit__close');
const popupImageCloseButton = document.querySelector('.popup-image__close');
const saveButtonInAddPopup = document.querySelector('.popup-add__save-button');
const addForm = document.querySelector('.popup-add__form');
const editForm = document.querySelector('.popup-edit__form');


const popupEdit = new PopupWithForm({popupSelector:popupEditSelector,
    formSubmit: (data) => {

    }
});

/* Создаём PopupWithForm для popupAdd, вешаем слушателей */
const popupAdd = new PopupWithForm({popupSelector: popupAddSelector,
    formSubmit: (data) => {
    console.log(data);
        defaultCards.addItem(newCard(data['place-name-input'], data['url-input']));
        popupAdd.close();
    }
});

popupAdd.setEventListeners();

/* Создаём PopupWithImage и вешаем слушателя для закрытия */
const popupWithImage = new PopupWithImage(popupImageSelector);

popupWithImage.setEventListeners();

/* Создаём функцию для открытия PopupWithImage */
function handleCardClick(src, alt) {
    popupWithImage.open(src, alt);
}

/* Создание элементов по дефолту через Section */
const defaultCards = new Section({items: initialCards, renderer: (item) => {
        const card = new Card (item.name, item.link, '.card-template', handleCardClick);
        const cardElement = card.generateCard();

        defaultCards.addItem(cardElement);
    } }, cardsListSelector);

defaultCards.renderItems();

/* Функция создания новой карточки */

function newCard(link, name) {
    const card = new Card (link, name, '.card-template', handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
}

/* Создание объектов валидации форм */
const validateAddForm = new FormValidator(formValidationParam,addForm);
const validateEditForm = new FormValidator(formValidationParam,editForm);

/* Активация функции валидации */
validateAddForm.enableValidation();
validateEditForm.enableValidation();


/* Функция создания новой карточки в форме добавления с использованием объекта Card */
/*
function addNewCard(e) {
    e.preventDefault();

    const title = cardNameInput.value;
    const src = cardLinkInput.value;
    const card = new Card (title, src, '.card-template', handleCardClick);
    const cardElement = card.generateCard();

    cardsContainer.prepend(cardElement);

}
*/
function changeProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

}

/* Функции открытия PopUp с проверкой валидации, чтобы ошибки не сохранялись при закрытии PopUp без сохранения изменений */
function openEditPopup() {
    popupEdit.open();
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    validateEditForm.resetValidation();
}

function openAddPopup() {
    popupAdd.open();

    validateAddForm.resetValidation();
}


buttonOpenEditPopup.addEventListener('click', openEditPopup);
buttonOpenAddPopup.addEventListener('click', openAddPopup);
popupEditSaveChanges.addEventListener('submit', changeProfileInfo);


