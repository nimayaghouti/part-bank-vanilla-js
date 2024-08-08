import instance from "../services/apiService.js";

const phoneDisplayElement = document.querySelector(".user-info__phone");

const dialog = document.querySelector(".info__dialog");

// const 

const table = document.querySelector(".transactions__table");
const tableBody = document.querySelector(".table__body");
const paginationPrevious = document.querySelector(".pagination__previous");
const paginationNext = document.querySelector(".pagination__next");
const pageButtonsWrapper = document.querySelector(".pagination__dynamic-buttons-wrapper");


// const storedUser = Storage.getItem('user');
// phoneDisplayElement.textContent = storedUser?.phone;


const setDashboardStatus = () => {
    const hashtag = window.location.hash;
    if (hashtag === "#active") {
        dialog.classList.add('dialog_active-dashboard');
        table.classList.add('table_active-dashboard')
    }
}
setDashboardStatus();

const TEMP_USER_ID = '1';
const getTransaction = async () => {
    const { data } = await instance.get(`transactions/${TEMP_USER_ID}`);
    const status = data.response.data.status;

    if (status === "success") {
        return data.response.data.results;
    } else {
        return [];
    }
};
const tableData = await getTransaction();


// creating tr tags based on data //////////////////////////////
const tableRowsArray = tableData.map(rowData => {
    const type = rowData.type === "deposit" ? "واریز" : "برداشت";
    const date = new Date(rowData.date).toLocaleString("fa-IR", "numeric");
    const amount = parseInt(rowData.amount.split(',').join('')).toLocaleString("fa-IR");

    return (`
        <tr>
            <td>
                <img src="./assets/svg/icons/dashboard/money-${rowData.type}.svg" />
                <span>${type}</span>
            </td>
            <td>${date}</td>
            <td>${amount}</td>
        </tr>
    `);
});


// implementing the pagination functionality //////////////////////////////
let currentPage = 1;
const maxItems = 5;
const lastPage = Math.ceil(tableRowsArray.length / maxItems); // totalPages

// refresh table rows of data
function refreshTbody() {
    const currentTbodyContent = tableRowsArray.slice(currentPage * maxItems - maxItems, currentPage * maxItems);
    tableBody.innerHTML = "";
    currentTbodyContent.map(trTag => tableBody.insertAdjacentHTML('beforeend', trTag));
}

// refresh styles of number buttons
function refreshButtons(remove = false) {
    const selectedPageButton = document.querySelector(`#pagination__dynamic-button-${currentPage}`);
    if (!selectedPageButton) return;
    if (remove) {
        selectedPageButton.classList.remove('pagination__dynamic-button_selected');
    } else {
        selectedPageButton.classList.add('pagination__dynamic-button_selected');
    }
}

// refreshing
function refresh(cp) {
    refreshButtons(true); // cp has not changed yet
    currentPage = cp; // cp changes
    refreshTbody();
    refreshButtons();
}

// creating and adding number buttons
for (let i = 1; i <= lastPage; i++) {
    const pageButton = document.createElement('button');

    pageButton.setAttribute("id", `pagination__dynamic-button-${i}`);
    pageButton.setAttribute("class", `pagination__dynamic-button`);
    pageButton.innerHTML = i.toLocaleString("fa-IR");
    pageButton.addEventListener('click', () => {
        refresh(i);
    })

    pageButtonsWrapper.append(pageButton);
}

// arrow buttons
paginationPrevious.addEventListener('click', () => {
    if (currentPage === 1) return;
    refresh(currentPage - 1)
});
paginationNext.addEventListener('click', () => {
    if (currentPage === lastPage) return;
    refresh(currentPage + 1)
});

// initial refresh to put every thing together
if (!tableData.length) {
    tableBody.insertAdjacentHTML('beforeend', "<p style='padding: 5rem 0;'>هیچ داده ای وجود ندارد!</p>");
    document.querySelector('.button-container').style.display = 'none';
} else {
    refresh(currentPage);
}