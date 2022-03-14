const initialCards = [
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


let defaultElement = [];
const elementTemplate = document.querySelector('#list-element').content;
const elementsList = document.querySelector('.elements__list');
const nameInput = document.querySelector('.popup__input_name');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close');
const popupSaveChanges = document.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup-add');
const openAddPopupButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup-add__close');
const saveNewCard = document.querySelector('.popup-add__form');
const cardNameInput = document.querySelector('.popup-add__input_name');
const cardLinkInput = document.querySelector('.popup-add__input_link');
const fullImageSection = document.querySelector('.popup-image');
const imageCloseButton = document.querySelector('.popup-image__close');


function addDefaultCards() {
    for (let i = 0; i < initialCards.length; i++) {
        let elementItem = elementTemplate.querySelector('.element').cloneNode(true);

        elementItem.querySelector('.element__figcaption-text').textContent = initialCards[i].name;
        elementItem.querySelector('.element__image').src = initialCards[i].link;
        elementItem.querySelector('.element__image').alt = initialCards[i].name;

        defaultElement[i] = elementItem;

        elementItem.querySelector('.element__like-button').addEventListener('click', function(evt) {
            evt.target.classList.toggle('element__like-button_active');
        });

        elementItem.querySelector('.element__delete-button').addEventListener('click', function(evt) {
            const elementForDelete = evt.target.closest('.element');

            elementForDelete.remove();
        });

        elementItem.querySelector('.element__image').addEventListener('click', function() {
            fullImageSection.querySelector('.popup-image__image').src = this.src;
            fullImageSection.querySelector('.popup-image__image').alt = this.alt;
            fullImageSection.querySelector('.popup-image__subtitle').textContent = this.alt;

            changeImagePopup();
        });

        elementsList.append(defaultElement[i]);
    }
}

function addNewCard(event) {
    event.preventDefault();

    let elementItem = elementTemplate.querySelector('.element').cloneNode(true);

    elementItem.querySelector('.element__figcaption-text').textContent = cardNameInput.value;
    elementItem.querySelector('.element__image').src = cardLinkInput.value;
    elementItem.querySelector('.element__image').alt = cardNameInput.value;

    elementItem.querySelector('.element__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    elementItem.querySelector('.element__delete-button').addEventListener('click', function(evt) {
        const elementForDelete = evt.target.closest('.element');

        elementForDelete.remove();
    });

    elementItem.querySelector('.element__image').addEventListener('click', function() {
        fullImageSection.querySelector('.popup-image__image').src = this.src;
        fullImageSection.querySelector('.popup-image__image').alt = this.alt;
        fullImageSection.querySelector('.popup-image__subtitle').textContent = this.alt;

        changeImagePopup();
    });

    elementsList.prepend(elementItem);

    changeAddPopup();
}

function changeProfileInfo(event) {
    event.preventDefault();

    profileName.innerHTML = nameInput.value;
    profileSubtitle.innerHTML = subtitleInput.value;

    changePopup();
}

function changePopup() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    popup.classList.toggle('popup_opened');
}

function changeAddPopup() {
    cardLinkInput.value = null;
    cardNameInput.value = null;

    popupAdd.classList.toggle('popup-add_opened');
}

function changeImagePopup() {
    document.querySelector('.popup-image').classList.toggle('popup-image_opened');
}


window.addEventListener('DOMContentLoaded', addDefaultCards);
openPopupButton.addEventListener('click', changePopup);
closePopupButton.addEventListener('click', changePopup);
openAddPopupButton.addEventListener('click', changeAddPopup);
closeAddPopupButton.addEventListener('click', changeAddPopup);
imageCloseButton.addEventListener('click', changeImagePopup);
popupSaveChanges.addEventListener('submit', changeProfileInfo);
saveNewCard.addEventListener('submit', addNewCard);












