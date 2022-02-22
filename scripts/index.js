let nameInput = document.querySelector('.popup__input-name');
let subtitleInput = document.querySelector('.popup__input-subtitle');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close');
let popupSaveChanges = document.querySelector('.popup__edit-profile-info-form');


function openPopup() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function changeProfileInfo(event) {
    event.preventDefault();

    profileName.innerHTML = nameInput.value;
    profileSubtitle.innerHTML = subtitleInput.value;

    closePopup();

}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
popupSaveChanges.addEventListener('submit', changeProfileInfo);




/*
(like-button script)


let likeButtons = document.querySelectorAll('.element__like-button'), index, button;

for (index = 0; index < likeButtons.length; index++) {
    button = likeButtons[index];
    button.addEventListener('click', changeLikeButton);

    function changeLikeButton() {
        if (this.classList.contains('element__like-button_active')) {
            this.classList.remove('element__like-button_active');
        } else {
            this.classList.add('element__like-button_active');
        }
    }
}
*/



