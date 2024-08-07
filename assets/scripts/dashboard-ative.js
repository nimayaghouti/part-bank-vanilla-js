const phoneDisplayElement = document.querySelector(".user-info__phone");
const storedUser = Storage.getItem('user');

phoneDisplayElement.textContent = storedUser?.phone;


// TODO: GET transactions API and use them instead of fake-data.js

// getting data //////////////////////////////
const tableData = data;


// getting elements //////////////////////////////
const previousButton = document.querySelector(".pagination__previous");
const nextButton = document.querySelector(".pagination__next");
const tbody = document.querySelector(".table__body");
const pageButtonsWrapper = document.querySelector(".pagination__dynamic-buttons-wrapper");


// creating tr tags based on data //////////////////////////////
const tableRowsArray = tableData.map(rowData => {
    const type = rowData.type === "deposit" ? "واریز" : "برداشت";
    const date = new Date(rowData.dateTime).toLocaleString("fa-IR", "numeric");
    const amount = parseInt(rowData.Amount.split(',').join('')).toLocaleString("fa-IR");

    return (`
        <tr id="${rowData.id}" >
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
    tbody.innerHTML = "";
    currentTbodyContent.map(trTag => tbody.insertAdjacentHTML('beforeend', trTag));
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
    pageButton.innerHTML = i.toLocaleString("fa-IR");
    pageButton.addEventListener('click', () => {
        refresh(i);
    })

    pageButtonsWrapper.append(pageButton);
}

// arrow buttons
previousButton.addEventListener('click', () => {
    if (currentPage === 1) return;
    refresh(currentPage - 1)
});
nextButton.addEventListener('click', () => {
    if (currentPage === lastPage) return;
    refresh(currentPage + 1)
});

// initial refresh to put every thing together
if (!tableData.length) {
    tbody.insertAdjacentHTML('beforeend' ,"<p style='padding: 5rem 0;'>هیچ داده ای وجود ندارد!</p>");
    document.querySelector('.button-container').style.display = 'none';
} else {
    refresh(currentPage);
}