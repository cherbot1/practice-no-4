import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from "../components/PopupWithConfirm";
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api";
import * as constants from '../utils/constants.js';
import * as utils from '../utils/utils.js';
/* import {deleteCard} from "../utils/utils.js"; */

/* Создаём API */
export const api = new Api({
    url: 'nomoreparties.co/v1/cohort-41/',
    headers: {
        authorization: 'aa481936-6a56-438a-a67e-3ded844326aa',
        "Content-Type": 'application/json'
    }
});

/* Создаём UserInfo и подгружаем информацию о пользователе с сервера */
export const userInfo = new UserInfo(constants.nameSelector, constants.aboutSelector, constants.avatarSelector);

const userCloudInfo = api.getUserInfo();
export let myId;

userCloudInfo.then((data) => {
    myId = data._id;
    userInfo.setUserInfo(data);
});

/* Создание элементов по дефолту с сервера через Section */
const cardsCloudInfo = api.getCardsInfo();

const defaultCardsGlobal = {};

cardsCloudInfo.then((data) => {
    data.map((cardInfo) => {
        const defaultCards = new Section({items: [cardInfo], renderer: (cardInfo) => {
                const card = utils.createNewCard(cardInfo);
                defaultCards.addCloudItem(card);
            } }, constants.cardsListSelector);

        defaultCardsGlobal.inner = defaultCards;

        defaultCards.renderItems();
    })
})

/* Создаём PopupWithForm для popupEdit, колбэк formSubmit меняет данные на сервере, вешаем слушателей */
export const popupEdit = new PopupWithForm({popupSelector:constants.popupEditSelector,
    formSubmit: (updatedAccountData) => {
        api.changeUserInfo(updatedAccountData)
        .then((res) => {
            userInfo.setUserInfo(res);
        });
        popupEdit.close();
    }
});

popupEdit.setEventListeners();

/* Создаём PopupWithForm для popupAdd, вешаем слушателей */
export const popupAdd = new PopupWithForm({popupSelector: constants.popupAddSelector,
    formSubmit: (data) => {
    api.addCard(data)
        .then((res) => {
            const defaultCards = defaultCardsGlobal.inner;

            defaultCards.addItem(utils.createNewCard(res));
        })
        popupAdd.close();
    }
});

popupAdd.setEventListeners();

/* Создаём PopupWithImage, создаём функцию для открытия popUp по клику на изображение, вешаем слушателей */
export const popupWithImage = new PopupWithImage(constants.popupImageSelector);

export function handleCardClick(src, alt) {
    popupWithImage.open(src, alt);
}

popupWithImage.setEventListeners();

/* Создаём confirm popup */

export const confirmPopup = new PopupWithConfirm(constants.popupConfirmSelector, /*deleteCard*/);
confirmPopup.setEventListeners();

/* Создание объектов валидации форм */
export const validateAddForm = new FormValidator(constants.formValidationParam, constants.addForm);
export const validateEditForm = new FormValidator(constants.formValidationParam, constants.editForm);

/* Активация функции валидации */
validateAddForm.enableValidation();
validateEditForm.enableValidation();




