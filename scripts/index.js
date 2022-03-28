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


const elementTemplate = document.querySelector('#list-element').content;
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');
const cardsContainer = document.querySelector('.elements__list');
const nameInput = document.querySelector('.popup__input_name');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close');
const popupEditSaveChanges = document.querySelector('.popup-edit__form');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const popupAddSaveChanges = document.querySelector('.popup-add__form');
const cardNameInput = document.querySelector('.popup-add__input_name');
const cardLinkInput = document.querySelector('.popup-add__input_link');
const popupImageElementImage =  popupImage.querySelector('.popup-image__image');
const popupImageElementText =  popupImage.querySelector('.popup-image__subtitle');
const popupAddCloseButton = document.querySelector('.popup-add__close');
const popupEditCloseButton = document.querySelector('.popup-edit__close');
const popupImageCloseButton = document.querySelector('.popup-image__close');



function createCard(title, src, alt) {
    const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = elementItem.querySelector('.element__image');

    elementItem.querySelector('.element__figcaption-text').textContent = title;
    elementImage.src = src;
    elementImage.alt = alt;

    elementItem.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    elementItem.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        const elementForDelete = evt.target.closest('.element');

        elementForDelete.remove();
    });

    elementImage.addEventListener('click', function () {
        popupImageElementImage.src = this.src;
        popupImageElementImage.alt = this.alt;
        popupImageElementText.textContent = this.alt;

        openPopup(popupImage);
        closePopupWithoutCross(popupImage);
        closePopupWithEsc(popupImage);
    });

    return elementItem;
}

function addDefaultCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const title = initialCards[i].name;
        const src = initialCards[i].link;
        const alt = initialCards[i].name;
        const card = createCard(title, src, alt);

        cardsContainer.append(card);
    }
}

function createNewCard() {
    const title = cardNameInput.value;
    const src = cardLinkInput.value;
    const alt = cardNameInput.value;
    const newCard = createCard(title, src, alt);

    return newCard;
}

function addNewCard(e) {
    e.preventDefault();

    const newFormedCard = createNewCard();

    cardsContainer.prepend(newFormedCard);

    closePopup(popupAdd);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');

}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function closePopupWithoutCross(popup) {
    const closeCustomFunction = (evt) => {
        if (evt.target === popup){
            closePopup(popup);

            popup.removeEventListener('mousedown', closeCustomFunction);
        }
    }
    popup.addEventListener('mousedown', closeCustomFunction);
}

function closePopupWithEsc(popup) {
    const closeCustomFunction = (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);

            document.removeEventListener('keydown', closeCustomFunction);
        }
    }
    document.addEventListener('keydown', closeCustomFunction);
}

function closeButton() {
    const popup = this.closest('.popup');

    closePopup(popup);
}

function changeProfileInfo(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    closePopup(popupEdit);
}

function openEditPopup() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    openPopup(popupEdit);
    closePopupWithoutCross(popupEdit);
    closePopupWithEsc(popupEdit);
}

function openAddPopup() {
    popupAddSaveChanges.reset();

    openPopup(popupAdd);
    closePopupWithoutCross(popupAdd);
    closePopupWithEsc(popupAdd);
}


window.addEventListener('DOMContentLoaded', addDefaultCards);
popupButtonClose.addEventListener('click', closeButton);
buttonOpenEditPopup.addEventListener('click', openEditPopup);
buttonOpenAddPopup.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', closeButton);
popupEditCloseButton.addEventListener('click', closeButton);
popupImageCloseButton.addEventListener('click', closeButton);
popupEditSaveChanges.addEventListener('submit', changeProfileInfo);
popupAddSaveChanges.addEventListener('submit', addNewCard);

