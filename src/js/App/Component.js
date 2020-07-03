export default class {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  // Remove tooltip and associated CSS classes
  detach() {
    if (this.element) {
      const card = this.element.closest('.projects__card');
      card.classList.remove('tooltip-showing');
      card.classList.add('tooltip-end');
      setTimeout((e) => {
        card.classList.remove('tooltip-end');
      }, 200);
      this.element.remove();
    }
  }

  // Create a new tooltip
  attach() {
    this.hostElement
      .querySelector('.projects__card')
      .insertAdjacentElement(
        this.insertBefore ? 'afterbegin' : 'beforeend',
        this.element
      );
    this.card = this.element.closest('.projects__card');

    this.card.classList.remove('tooltip-end');
    this.card.classList.add('tooltip-showing');
  }
}
