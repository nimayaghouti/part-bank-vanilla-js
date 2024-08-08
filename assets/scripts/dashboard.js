import instance, { setToken } from '../services/apiService.js';
import { getUserDataFromLocalStorage } from './main.js';
import {
  convertNumberToPersian,
  formattedPersianNumber,
  formattedPersianDate,
  formattedCardNumber,
} from './utils.js';

const phoneNumberElement = document.querySelector('.user-info__phone');
const usernameElement = document.querySelector('.sidebar__user-name');
const idNumberElement = document.querySelector('.user-id__number');

const balanceAmountElement = document.querySelector('.card__balance-amount');
const accountCardNumber = document.querySelector('.card__number-group');

const ScoreMoneyElement = document.querySelector('.score__money');
const scoreNumberElement = document.querySelector('.score__number');

const installmentAmountElement = document.querySelector(
  '.installment__number_amount'
);
const installmentNumberElement = document.querySelector(
  '.installment__number_date'
);

const dialog = document.querySelector('.info__dialog');
const dialogButton = document.querySelector('.dialog__button');

const table = document.querySelector('.transactions__table');
const tableBody = document.querySelector('.table__body');
const paginationPrevious = document.querySelector('.pagination__previous');
const paginationNext = document.querySelector('.pagination__next');
const pageButtonsWrapper = document.querySelector(
  '.pagination__dynamic-buttons-wrapper'
);

const userData = getUserDataFromLocalStorage();
// console.log(userData);

phoneNumberElement.textContent = convertNumberToPersian(userData.phoneNumber);
usernameElement.textContent = `${userData.firstName} ${userData.lastName}`;
idNumberElement.textContent = convertNumberToPersian(userData.idNumber);

const getTransaction = async () => {
  setToken(userData.token);
  const { data } = await instance.get('/transactions');
  const transactionsList = data.data.results;
  // console.log(transactionsList);
  return transactionsList;
};

const setDashboardStatus = async () => {
  setToken(userData.token);
  const { data } = await instance.get('/deposit-account');
  const hasAccount = data.data.result.id;

  if (hasAccount) {
    dialog.classList.add('dialog_active-dashboard');
    table.classList.add('table_active-dashboard');

    const tableData = await getTransaction();
    const depositAccountData = data.data.result;

    handlePuttingAccountData({
      tableData,
      depositAccountData,
    });
  } else {
    dialogButton.addEventListener('click', (event) => {
      window.location = './pages/create-account/personal-info.html';
    });
  }
};

setDashboardStatus();

async function handlePuttingAccountData(customData) {
  const { tableData, depositAccountData } = customData;

  balanceAmountElement.textContent = formattedPersianNumber(
    depositAccountData.balance
  );
  accountCardNumber.textContent = convertNumberToPersian(formattedCardNumber(depositAccountData.cardNumber));

  ScoreMoneyElement.textContent = formattedPersianNumber(
    depositAccountData.score.amount
  );
  scoreNumberElement.textContent = formattedPersianNumber(
    depositAccountData.score.paymentPeriod
  );

  installmentAmountElement.textContent =
    formattedPersianNumber(depositAccountData.upcomingInstalment.amount) +
    ' ریال';
  //  installmentNumberElement.textContent = formattedPersianDate(depositAccountData.upcomingInstalment.dueDate);

  // creating tr tags based on data //////////////////////////////
  const tableRowsArray = tableData.map((rowData) => {
    const type = rowData.type === 'deposit' ? 'واریز' : 'برداشت';
    const date = formattedPersianDate(rowData.date);
    const amount = formattedPersianNumber(rowData.amount);

    return `
          <tr>
              <td>
                  <img src="./assets/svg/icons/dashboard/money-${rowData.type}.svg" />
                  <span>${type}</span>
              </td>
              <td>${date}</td>
              <td>${amount}</td>
          </tr>
      `;
  });

  // implementing the pagination functionality //////////////////////////////
  let currentPage = 1;
  const maxItems = 5;
  const lastPage = Math.ceil(tableRowsArray.length / maxItems); // totalPages

  // refresh table rows of data
  const refreshTbody = () => {
    const currentTbodyContent = tableRowsArray.slice(
      currentPage * maxItems - maxItems,
      currentPage * maxItems
    );
    tableBody.innerHTML = '';
    currentTbodyContent.map((trTag) =>
      tableBody.insertAdjacentHTML('beforeend', trTag)
    );
  };

  // refresh styles of number buttons
  const refreshButtons = (remove = false) => {
    const selectedPageButton = document.querySelector(
      `#pagination__dynamic-button-${currentPage}`
    );
    if (!selectedPageButton) return;
    if (remove) {
      selectedPageButton.classList.remove(
        'pagination__dynamic-button_selected'
      );
    } else {
      selectedPageButton.classList.add('pagination__dynamic-button_selected');
    }
  };

  // refreshing
  const refresh = (cp) => {
    refreshButtons(true); // cp has not changed yet
    currentPage = cp; // cp changes
    refreshTbody();
    refreshButtons();
  };

  // creating and adding number buttons
  for (let i = 1; i <= lastPage; i++) {
    const pageButton = document.createElement('button');

    pageButton.setAttribute('id', `pagination__dynamic-button-${i}`);
    pageButton.setAttribute('class', `pagination__dynamic-button`);
    pageButton.innerHTML = i.toLocaleString('fa-IR');
    pageButton.addEventListener('click', () => {
      refresh(i);
    });

    pageButtonsWrapper.append(pageButton);
  }

  // arrow buttons
  paginationPrevious.addEventListener('click', () => {
    if (currentPage === 1) return;
    refresh(currentPage - 1);
  });
  paginationNext.addEventListener('click', () => {
    if (currentPage === lastPage) return;
    refresh(currentPage + 1);
  });

  // initial refresh to put every thing together
  if (!tableData.length) {
    tableBody.insertAdjacentHTML(
      'beforeend',
      "<p style='padding: 5rem 0;'>هیچ داده ای وجود ندارد!</p>"
    );
    document.querySelector('.button-container').style.display = 'none';
  } else {
    refresh(currentPage);
  }
}
