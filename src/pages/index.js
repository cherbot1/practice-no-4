import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api";
import * as constants from '../utils/constants.js';
import * as utils from '../utils/utils.js';

/* Создаём API */
export const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-41/',
    headers: {
        authorization: 'aa481936-6a56-438a-a67e-3ded844326aa',
        "content-type": 'application/json'
    }
});

/* Создаём UserInfo и подгружаем информацию о пользователе с сервера */
export const userInfo = new UserInfo(constants.nameSelector, constants.aboutSelector, constants.avatarSelector);

const userCloudInfo = api.getUserInfo();

userCloudInfo.then((data) => {
    userInfo.setUserInfo(data);
});

/* Создание элементов по дефолту с сервера через Section */
const cardsCloudInfo = api.getCardsInfo();

cardsCloudInfo.then((data) => {
    data.map((cardInfo) => {
        const defaultCards = new Section({items: [cardInfo], renderer: (cardInfo) => {
                const card = utils.createNewCard (cardInfo.name, cardInfo.link);

                defaultCards.addItem(card);
            } }, constants.cardsListSelector);

        defaultCards.renderItems();
    })
})

/* Создаём PopupWithForm для popupEdit, вешаем слушателей */
export const popupEdit = new PopupWithForm({popupSelector:constants.popupEditSelector,
    formSubmit: (updatedAccountData) => {
        userInfo.setUserInfo(updatedAccountData);

        popupEdit.close();
    }
});

popupEdit.setEventListeners();

/* Создаём PopupWithForm для popupAdd, вешаем слушателей */
export const popupAdd = new PopupWithForm({popupSelector: constants.popupAddSelector,
    formSubmit: (data) => {
        defaultCards.addItem(utils.createNewCard(data['place-name-input'], data['url-input']));

        popupAdd.close();
    }
});

popupAdd.setEventListeners();

/* Создаём PopupWithImage, создаём функцию для открытия поап по клику на изображение, вешаем слушателей */
export const popupWithImage = new PopupWithImage(constants.popupImageSelector);

export function handleCardClick(src, alt) {
    popupWithImage.open(src, alt);
}

popupWithImage.setEventListeners();



/* Создание объектов валидации форм */
export const validateAddForm = new FormValidator(constants.formValidationParam, constants.addForm);
export const validateEditForm = new FormValidator(constants.formValidationParam, constants.editForm);

/* Активация функции валидации */
validateAddForm.enableValidation();
validateEditForm.enableValidation();




