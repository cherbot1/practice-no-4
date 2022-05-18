export default class Section {

    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /* Создаём карточку циклом, используя вводный колбэк */
    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        })
    }

    /* Добавляем карточку на страницу */
    addItem(element) {
        this._container.prepend(element);
    }

    /* Добавляем карточки с сервера в обратном порядке для корректного отображения */
    addCloudItem(element) {
        this._container.append(element);
    }
}