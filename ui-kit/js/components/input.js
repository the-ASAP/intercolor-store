class QuantityInput {
  constructor(container) {
    this.quantityButtons = container.querySelectorAll(".quantity-control");
    this.quantityInput = container.querySelector(".quantity-value");
    this.initialize();
  }
  initialize() {
    this.quantityButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = parseInt(this.quantityInput.value) || 0;

        if (button.dataset.action === "plus") {
          this.quantityInput.value = value + 1;
        } else {
          this.quantityInput.value = Math.max(value - 1, 0);
        }
      });
    });
  }
}

export function initQuantityInputs() {
  document.querySelectorAll(".quantity-input").forEach((container) => {
    new QuantityInput(container);
  });
}
