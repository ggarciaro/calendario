import {generatePagination} from './utils';

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

// Pagination
const totalCalendars = document.getElementById('tableData').querySelectorAll('.row');
document.getElementById('totalCalendars').innerText = totalCalendars.length;
document.getElementById('totalRegisters').innerText = totalCalendars.length;

const maxPerPage = 18;
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