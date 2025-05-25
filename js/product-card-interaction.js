document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const decreaseButton = card.querySelector('.quantity-decrease');
    const increaseButton = card.querySelector('.quantity-increase');
    const quantityInput = card.querySelector('.quantity-input');

    if (decreaseButton && increaseButton && quantityInput) {
      decreaseButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > parseInt(quantityInput.min, 10)) {
          quantityInput.value = currentValue - 1;
        }
      });

      increaseButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
      });
    }
  });
}); 