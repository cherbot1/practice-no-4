import { Card } from './Card.js';


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

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
export const popupImage = document.querySelector('.popup-image');
const cardsContainer = document.querySelector('.elements__list');
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
export const popupImageElementImage =  popupImage.querySelector('.popup-image__image');
export const popupImageElementText =  popupImage.querySelector('.popup-image__subtitle');
const popupAddCloseButton = document.querySelector('.popup-add__close');
const popupEditCloseButton = document.querySelector('.popup-edit__close');
const popupImageCloseButton = document.querySelector('.popup-image__close');
const saveButtonInAddPopup = document.querySelector('.popup-add__save-button');

function addNewCard(e) {
    e.preventDefault();

    const title = cardNameInput.value;
    const src = cardLinkInput.value;
    const card = new Card (title, src);
    const cardElement = card.generateCard();


    cardsContainer.prepend(cardElement);

    closePopup(popupAdd);
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupWithEsc);
    document.addEventListener('mousedown', closePopupWithoutCross);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupWithEsc);
    document.removeEventListener('mousedown', closePopupWithoutCross);
}

function closePopupWithoutCross(evt) {
    if (evt.target.classList.contains('popup_opened')){
        closePopup(evt.target);
    }

}

function closePopupWithEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');

        closePopup(openedPopup);
    }
}

function handleClosestPopup(evt) {
    const popup = evt.target.closest('.popup');

    closePopup(popup);
}

function changeProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    closePopup(popupEdit);
}

function openEditPopup() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    openPopup(popupEdit);
}

function openAddPopup() {
    popupAddSaveChanges.reset();

    saveButtonInAddPopup.classList.add('popup__save-button_disabled');
    saveButtonInAddPopup.disabled = true;

    openPopup(popupAdd);
}

initialCards.forEach((item) => {
    const card = new Card (item.name, item.link);
    const cardElement = card.generateCard();

    document.querySelector('.elements__list').append(cardElement);
})

buttonOpenEditPopup.addEventListener('click', openEditPopup);
buttonOpenAddPopup.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', handleClosestPopup);
popupEditCloseButton.addEventListener('click', handleClosestPopup);
popupImageCloseButton.addEventListener('click', handleClosestPopup);
popupEditSaveChanges.addEventListener('submit', changeProfileInfo);
popupAddSaveChanges.addEventListener('submit', addNewCard);

