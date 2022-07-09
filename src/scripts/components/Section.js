export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(cardInfo) {
    cardInfo.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, isBefore) {
    if (isBefore) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
