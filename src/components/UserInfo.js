export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._accountName = document.querySelector(nameSelector);
        this._accountAbout = document.querySelector(aboutSelector);
        this._accountAvatar = document.querySelector(avatarSelector);
    }

    /* Собираем информацию со страницы */
    getUserInfo() {
        const accountInfo = {
            name: this._accountName.textContent,
            about: this._accountAbout.textContent,
            avatar: this._accountAvatar.src
        }

        return accountInfo;
    }

    /* Меняем информацию на странице */
    setUserInfo(data) {
        this._accountName.textContent = data.name;
        this._accountAbout.textContent = data.about;

        this.setUserAvatar(data);
    }

    setUserAvatar(data) {
        this._accountAvatar.src = data.avatar;
        this._accountAvatar.alt = data.name;
    }
}