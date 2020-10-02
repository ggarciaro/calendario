import '../styles/dashboard.scss';
import '../public/assets/img/dashboard/left.svg';
import '../public/assets/img/dashboard/right.svg';

const toggleControllers = () => {
    const hasCheckedInputs = document.getElementsByClassName('table__body')[0].querySelectorAll('input:checked').length > 0;
    const controllers = document.getElementById('tableControllers');
    const dashboardContainer = document.getElementById('dashboardContainer');

    if (hasCheckedInputs) {
        controllers.style.display = 'flex';
        dashboardContainer.style.padding = '1rem 2rem 7rem 2rem';
    } else {
        controllers.style.display = 'none';
        dashboardContainer.style.padding = '1rem 2rem';
    }
}

const toggleCheckAll = (isChecked) => {
    const inputs = document.getElementsByClassName('table__body')[0].querySelectorAll('.custom-checkbox__input');
    if (inputs) {
        for (let i = 0 ; i < inputs.length; i++) {
            inputs[i].checked = isChecked;
        }
    }
    toggleControllers();
};

const checkInput = (isChecked) => {
    const hasUnchecked = document.getElementsByClassName('table__body')[0].querySelectorAll('input:not(:checked)').length > 0;
    const globalCheckbox = document.getElementById('globalCheckbox');
    if (isChecked && !hasUnchecked) {
        globalCheckbox.checked = true;
    } else {
        globalCheckbox.checked = false;
    }
    toggleControllers();
}

const resetDisplayedRows = (rows) => {
    for ( let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('row--show')) rows[i].classList.remove('row--show');
    }
}

const showSelectedRows = (rows, max, currentPage) => {
    resetDisplayedRows(rows);
    for ( let j = (currentPage - 1) * max; j < currentPage * max; j++ ) {
        rows[j].classList.add('row--show');
        if (!rows[j + 1]) break;
    }
    const displayedCalendars = document.getElementById('tableData').querySelectorAll('.row--show');
    document.getElementById('displayedCalendars').innerText = displayedCalendars.length;
}

const generatePagination = (pages, currentPage) => {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''
    const beforeBtn = `
        <div ${currentPage !== 1 ? 'class="pagination__btn" onclick="navigate(`before`)"' : 'class="pagination__btn pagination__btn--disabled"'}">
            <img src="./css/images/left.svg" alt="Anterior">
            <p>Anterior</p>
        </div>
    `;
    let pagesLinks = '';
    for (let k = 1; k < pages + 1; k++) {
        pagesLinks += currentPage !== k ? 
                `<p class="pagination__page" onclick="navigate('${k}')">${k}</p>`:
                `<p class="pagination__k pagination__page--selected">${k}</p>`;
    }
    const nextBtn = `
        <div ${currentPage !== pages ? 'class="pagination__btn" onclick="navigate(`next`)"' : 'class="pagination__btn pagination__btn--disabled"'}">
            <p>Siguiente</p>
            <img src="./css/images/right.svg" alt="Anterior">
        </div>
    `;
    pagination.insertAdjacentHTML("afterbegin", beforeBtn + pagesLinks + nextBtn)
}

// Pagination
const totalCalendars = document.getElementById('tableData').querySelectorAll('.row');
document.getElementById('totalCalendars').innerText = totalCalendars.length;
document.getElementById('totalRegisters').innerText = totalCalendars.length;

const maxPerPage = 20;
const numberPages = Math.ceil(totalCalendars.length / maxPerPage);
let currentPage = 1;

const printTable = () => {
    generatePagination(numberPages, currentPage);
    showSelectedRows(totalCalendars, maxPerPage, currentPage);
}

const navigate = (page) => {
    switch (page) {
        case 'before':
            currentPage--;
            break;
        case 'next':
            currentPage++;
            break;
        default:
            currentPage = Number(page);
            break;
    }
    printTable();
}

printTable();

window.toggleCheckAll = toggleCheckAll;
window.checkInput = checkInput;
window.navigate = navigate;