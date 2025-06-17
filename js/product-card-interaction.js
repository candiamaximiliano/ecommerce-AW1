document.addEventListener('DOMContentLoaded', () => {
  initializeProductInteractions();
});

document.addEventListener('productsLoaded', () => {
  initializeProductInteractions();
});

function initializeProductInteractions() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    if (card.dataset.initialized === 'true') {
      return;
    }

    const decreaseButton = card.querySelector('.quantity-decrease');
    const increaseButton = card.querySelector('.quantity-increase');
    const quantityInput = card.querySelector('.quantity-input');

    if (decreaseButton && increaseButton && quantityInput) {
      decreaseButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleQuantityDecrease(quantityInput);
      });

      increaseButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleQuantityIncrease(quantityInput);
      });

      card.dataset.initialized = 'true';
    }
  });
}

function handleQuantityDecrease(quantityInput) {
  let currentValue = parseInt(quantityInput.value, 10);
  const minValue = parseInt(quantityInput.min, 10);
  
  if (currentValue > minValue) {
    quantityInput.value = currentValue - 1;
  }
}

function handleQuantityIncrease(quantityInput) {
  let currentValue = parseInt(quantityInput.value, 10);
  const maxValue = parseInt(quantityInput.max, 10);
  
  if (!maxValue || currentValue < maxValue) {
    quantityInput.value = currentValue + 1;
  } else {
    alert(`Stock máximo: ${maxValue}`);
  }
} 