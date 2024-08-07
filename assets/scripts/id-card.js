const cardFrontImage = document.querySelector('.id-card__image_front');
const cardBackImage = document.querySelector('.id-card__image_back');
const optionsFrontImage = document.querySelector('.id-card__options_front');
const optionsbackImage = document.querySelector('.id-card__options_back');
const fileInputFrontImage = document.querySelector('#file-input-front-image');
const fileInputBackImage = document.querySelector('#file-input-back-image');
const nextButton = document.querySelector('.button_primary');
const previousButton = document.querySelector('.button_secondary');

const appendImage = (file, targetElement, targetOptions) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = 'ID Card';
      targetElement.appendChild(img);
      targetElement.style.pointerEvents = 'none';

      targetOptions.style.display = 'block';
      targetOptions.style.pointerEvents = 'auto';
    };
    reader.readAsDataURL(file);
  }
};

fileInputFrontImage.addEventListener('change', (event) => {
  appendImage(event.target.files[0], cardFrontImage, optionsFrontImage);
});

fileInputBackImage.addEventListener('change', (event) => {
  appendImage(event.target.files[0], cardBackImage, optionsbackImage);
});

cardFrontImage.addEventListener('click', () => {
  fileInputFrontImage.click();
});

cardBackImage.addEventListener('click', () => {
  fileInputBackImage.click();
});

nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location = 'confirm-info.html';
});

previousButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location = 'personal-info.html';
});
