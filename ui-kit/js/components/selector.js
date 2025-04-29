class Selector {
  constructor(container) {
    this.container = container;
    this.trigger = container.querySelector(".selector__trigger");
    this.optionsContainer = container.querySelector(".selector__options");
    this.options = Array.from(container.querySelectorAll(".selector__option"));
    this.selectedOption = container.querySelector(
      ".selector__option--selected"
    );

    this.initialize();
  }

  initialize() {
    this.trigger.addEventListener("click", () => this.toggle());
    document.addEventListener("click", (e) => this.handleOutsideClick(e));

    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        if (!option.classList.contains("selector__option--disabled")) {
          this.selectOption(option);
        }
      });
    });

    if (this.selectedOption) {
      const bgClass = this.getBackgroundColor(this.selectedOption);
      if (bgClass) this.trigger.classList.add(bgClass);
      this.updateTriggerText(this.selectedOption.textContent);
    }
  }

  toggle() {
    this.optionsContainer.classList.toggle("selector__options--visible");
    this.trigger.classList.toggle("selector__trigger--active");
  }

  selectOption(option) {
    this.options.forEach((opt) => {
      opt.classList.remove("selector__option--selected");
      const bgClass = this.getBackgroundColor(opt);
      if (bgClass) this.trigger.classList.remove(bgClass);
    });
    option.classList.add("selector__option--selected");
    const bgClass = this.getBackgroundColor(option);
    if (bgClass) this.trigger.classList.add(bgClass);
    this.updateTriggerText(option.textContent);
    this.toggle();
  }

  getBackgroundColor(option) {
    return Array.from(option.classList).find((className) =>
      className.startsWith("selector__option--color-bg-")
    );
  }

  updateTriggerText(text) {
    this.trigger.textContent = text;
  }

  handleOutsideClick(e) {
    if (!this.container.contains(e.target)) {
      this.optionsContainer.classList.remove("selector__options--visible");
      this.trigger.classList.remove("selector__trigger--active");
    }
  }
}

export function initSelectors() {
  document.querySelectorAll(".selector").forEach((container) => {
    new Selector(container);
  });
}
