import Card from '../components/Card.js';
import * as constants from './constants.js';
import * as index from '../pages/index.js';
import {api, handleCardClick, myId} from "../pages/index.js";

/* Функция создания новой карточки */


export function createNewCard(data) {
    const card = new Card ({
        link: data.link,
        name: data.name,
        likes: data.likes,
        _id: data._id,
        myId: myId,
        userId: data.owner._id
    }, '.card-template', handleCardClick,/* openConfirmPopup */);
    const cardElement = card.generateCard();

    return cardElement;
}

/* Функции открытия popupEdit со сбросом валидации */
export function openEditPopup() {
    const accountData = index.userInfo.getUserInfo();

    index.popupEdit.open();

    constants.nameInput.value = accountData.name;
    constants.subtitleInput.value = accountData.about;

    index.validateEditForm.resetValidation();
}
/*
export function openConfirmPopup(card) {
    index.confirmPopup.open(card);
}

export function deleteCard(card) {
    api.deleteCard(card._id)
        .then(() => {
            card.deleteCard();
            index.confirmPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
}
*/
/* Функция открытия popupAdd со сбросом валидации */
export function openAddPopup() {
    index.popupAdd.open();

    index.validateAddForm.resetValidation();
}

/* Слушатели кнопок открытия popup */
constants.buttonOpenEditPopup.addEventListener('click', openEditPopup);
constants.buttonOpenAddPopup.addEventListener('click', openAddPopup);