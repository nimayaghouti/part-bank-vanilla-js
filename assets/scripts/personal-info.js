const nextButton = document.querySelector('.button_primary');
const previousButton = document.querySelector('.button_secondary');

nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location = 'id-card.html';
});

previousButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location = '../../dashboard.html';
});
