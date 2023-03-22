const incrementBtns = document.querySelectorAll('.cardmenu .card-body #increment');
const decrementBtns = document.querySelectorAll('.cardmenu .card-body #decrement');
const prixElems = document.getElementsByClassName('prix');

for (let i = 0; i < incrementBtns.length; i++) {
    let count = 0;

    incrementBtns[i].addEventListener('click', () => {
        count++;
        prixElems[i].innerText = ` ${count}`;
    });

    decrementBtns[i].addEventListener('click', () => {
        count--;
        if (count < 0) {
            count = 0;
        }
        prixElems[i].innerText = ` ${count}`;
    });
}
// Panier

const buyButtons = document.querySelectorAll('.card-body .btn-primary');

buyButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();

    const cardBody = button.parentNode;
    const cardTitle = cardBody.querySelector('.card-title1').textContent;
    const cardPrice = parseFloat(cardBody.querySelector('.price').textContent.replace('$', ''));
    const quantity = parseInt(cardBody.querySelector('.prix').textContent);

    if (quantity > 0) {
      addToCart(cardTitle, cardPrice, quantity);
    }
  });
});

const checkoutButton = document.querySelector('.checkout-button');

checkoutButton.addEventListener('click', event => {
  event.preventDefault();

  const cartItems = document.querySelectorAll('.cart-items li');

  if (cartItems.length > 0) {
    const totalPrice = Array.from(cartItems).reduce((total, item) => {
      return total + parseFloat(item.dataset.price);
    }, 0);
    document.querySelector('.cart-total').textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
});

function addToCart(title, price, quantity) {
  const cartItem = document.createElement('li');
  cartItem.dataset.price = (price * quantity).toFixed(2);
  cartItem.textContent = `${title} x ${quantity} - $${cartItem.dataset.price}`;

  const cartItems = document.querySelector('.cart-items');
  cartItems.appendChild(cartItem);

  const totalPrice = parseFloat(document.querySelector('.cart-total').textContent.replace('Total: $', ''));
  document.querySelector('.cart-total').textContent = `Total: $${(totalPrice + price * quantity).toFixed(2)}`;

  const quantityInputs = document.querySelectorAll('.card-body .prix');
  quantityInputs.forEach(input => {
    input.textContent = 0;
  });
}

const incrementButtons = document.querySelectorAll('#increment');
const decrementButtons = document.querySelectorAll('#decrement');

incrementButtons.forEach(button => {
  button.addEventListener('click', () => {
    const quantityInput = button.parentNode.querySelector('.prix');
    const currentQuantity = parseInt(quantityInput.textContent);
    quantityInput.textContent = currentQuantity + 1;
  });
});

decrementButtons.forEach(button => {
  button.addEventListener('click', () => {
    const quantityInput = button.parentNode.querySelector('.prix');
    const currentQuantity = parseInt(quantityInput.textContent);
    if (currentQuantity > 0) {
      quantityInput.textContent = currentQuantity - 1;
    }
  });
});
