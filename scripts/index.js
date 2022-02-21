/* Popup */
let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input-name');
let subtitleInput = document.querySelector('.popup__input-subtitle');

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function openPopup() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    popup.classList.add('popup_opened');

}

function closePopup() {

    popup.classList.remove('popup_opened');
}

/* Change name and subtitle */
let popupSaveChanges = document.querySelector('.popup__save-button');

popupSaveChanges.addEventListener('click', changeProfileInfo);

function changeProfileInfo(event) {
    profileName.innerHTML = nameInput.value;
    profileSubtitle.innerHTML = subtitleInput.value;

    event.preventDefault();
    popup.classList.remove('popup_opened');
}

/* Like-button-active */
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


