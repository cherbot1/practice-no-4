export default class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._accountName = document.querySelector(nameSelector);
        this._accountAbout = document.querySelector(aboutSelector);
    }

    /* Собираем информацию со страницы */
    getUserInfo() {
        const accountInfo = {
            name: this._accountName.textContent,
            about: this._accountAbout.textContent
        }

        return accountInfo;
    }

    /* Меняем информацию на странице */
    setUserInfo(updatedAccountData) {
        this._accountName.textContent = updatedAccountData['name-input'];
        this._accountAbout.textContent = updatedAccountData['about-input'];
    }
}