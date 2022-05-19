import Card from '../components/Card.js';
import * as constants from './constants.js';
import * as index from '../pages/index.js';
import {api, handleCardClick, myId, validateChangeAvatarForm} from "../pages/index.js";
import PopupWithConfirm from "../components/PopupWithConfirm";


/* Функция создания новой карточки */
export function createNewCard(data) {
    const card = new Card ({
        link: data.link,
        name: data.name,
        likes: data.likes,
        _id: data._id,
        myId: myId,
        userId: data.owner._id
    }, '.card-template', handleCardClick, openConfirmPopup);
    const cardElement = card.generateCard();

    return cardElement;
}

/* Функция открытия ConfirmPopup */
export function openConfirmPopup(card) {
    index.confirmPopup.open(card);
}

/* Функция для удаления карточки и со страницы и с сервера*/
export function deleteCard(card) {
    index.confirmPopup.renderLoading();
    api.deleteCard(card._id)
        .then(() => {
            card.deleteCard();
            index.confirmPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            index.confirmPopup.loadingFinished();
        })
}

/* Функция открытия popupAdd со сбросом валидации */
export function openAddPopup() {
    index.popupAdd.open();

    index.validateAddForm.resetValidation();
}

/* Функции открытия popupEdit со сбросом валидации */
export function openEditPopup() {
    const accountData = index.userInfo.getUserInfo();

    index.popupEdit.open();

    constants.nameInput.value = accountData.name;
    constants.subtitleInput.value = accountData.about;

    index.validateEditForm.resetValidation();
}

/* Функция открытия ChangeAvatarPopup */
export function openChangeAvatarPopup() {
    index.changeAvatarPopup.open();

    index.validateChangeAvatarForm.resetValidation();
}

/* Слушатели кнопок открытия popup */
constants.buttonOpenEditPopup.addEventListener('click', openEditPopup);
constants.buttonOpenAddPopup.addEventListener('click', openAddPopup);
constants.buttonOpenAvatarChange.addEventListener('click', openChangeAvatarPopup);