import Card from '../components/Card.js';
import * as constants from './constants.js';
import * as index from '../pages/index.js';
import {api, handleCardClick, myId, validateChangeAvatarForm} from "../pages/index.js";


/* Функция создания новой карточки */
export function createNewCard(data) {
    const card = new Card ({
        link: data.link,
        name: data.name,
        likes: data.likes,
        _id: data._id,
        myId: myId,
        userId: data.owner._id
    }, '.card-template', handleCardClick, openConfirmPopup, likeCard);
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

/* Функция добавления/удаления лайка */
export function likeCard(evt, card) {
    if (!evt.target.classList.contains('element__like-button_active')) {
        evt.target.classList.add('element__like-button_active');
        api.addLike(card._id)
            .then((res) => {
                card._changeLikesQuantity(res);
            })
            .catch((err) => {
                console.log(err);
            })
        card._likeCounter.textContent = card._likes.length;
    } else {
        evt.target.classList.remove('element__like-button_active');
        api.removeLike(card._id)
            .then((res) => {
                card._changeLikesQuantity(res);
            })
            .catch((err) => {
                console.log(err);
            })
        card._likeCounter.textContent = card._likes.length;
    }
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