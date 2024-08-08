export const convertNumberToPersian = (number) => {
  const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const convertedValue = number
    .toString()
    .replace(/\d/g, (index) => PERSIAN_DIGITS[index]);

  return convertedValue;
};

export const convertNumberToEnglish = (number) => {
  const ENGLISH_DIGITS = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };

  const convertedValue = number.replace(
    /[۰-۹]/g,
    (match) => ENGLISH_DIGITS[match]
  );
  return convertedValue;
};

export const formattedPersianNumber = (str) => {
  return parseInt(str).toLocaleString('fa-IR');
};

export const formattedPersianDate = (str, language = 'fa-IR') => {
  return new Date(str).toLocaleString(language, 'numeric');
};

export const formattedCardNumber = (str) => {
  const formattedValue = str.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formattedValue;
};
