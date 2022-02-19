let openPopupButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input-name');
let subtitleInput = document.querySelector('.popup__input-subtitle');
let popup = document.querySelector('.popup');

openPopupButton.addEventListener('click', openPopup);

function openPopup() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;

    popup.classList.add('popup_opened');

}

function closePopup() {
    let popup = document.querySelector('.popup');

    popup.classList.remove('popup_opened');
}

function changeProfileInfo() {
    profileName.innerHTML = nameInput.value;
    profileSubtitle.innerHTML = subtitleInput.value;

    popup.classList.remove('popup_opened');
}

