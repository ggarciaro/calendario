import {closeModal, generatePagination} from './utils';

import '../styles/dashboard.scss';
import '../public/assets/img/dashboard/left.svg';
import '../public/assets/img/dashboard/right.svg';

function updateControllers() {
    const totalChecked = document.getElementsByClassName('table__body')[0].querySelectorAll('input:checked').length;
    document.getElementById('totalChecked').innerHTML = totalChecked;

    const copyForThisYearBtn = document.getElementById('copyForThisYearBtn');
    copyForThisYearBtn.style.display = totalChecked > 1 ? 'none' : 'flex';
}

function toggleControllers(){
    const hasCheckedInputs = document.getElementsByClassName('table__body')[0].querySelectorAll('input:checked').length > 0;
    const controllers = document.getElementById('tableControllers');
    const dashboardContainer = document.getElementById('dashboardContainer');

    if (hasCheckedInputs) {
        updateControllers();
        controllers.style.display = 'flex';
        dashboardContainer.style.padding = '1rem 2rem 7rem 2rem';
    } else {
        controllers.style.display = 'none';
        dashboardContainer.style.padding = '1rem 2rem';
    }
}

function getChecked() {
    const checkedBoxes = document.getElementById('dashboardContainer').querySelectorAll('input:checked');
    const selectedRows = [];
    for (let i = 0; i<checkedBoxes.length; i++){
        const currentCheckbox = checkedBoxes[i];
        if (currentCheckbox.id !== 'globalCheckbox'){
            selectedRows.push(currentCheckbox.parentElement.parentElement.parentElement);
        }
    }
    return selectedRows;
}

function copyAllCalendars() {
    console.log('copiar todos los calendarios');

    const confirmCopyModal = document.getElementById('copyCalendars');
    closeModal(confirmCopyModal);
}

function copySelectedCalendars() {
    const selectedCalendars = getChecked();
    console.log(selectedCalendars);

    const confirmCopyModal = document.getElementById('copyCalendars');
    closeModal(confirmCopyModal);
}

function confirmCopy(copyAll) {
    if (copyAll) {
        document.getElementById('confirmCopyBtn').onclick = copyAllCalendars;
    } else {
        document.getElementById('confirmCopyBtn').onclick = copySelectedCalendars;
    }
    document.getElementById('popUp').style.display = 'flex';
    document.getElementById('copyCalendars').style.display = 'block';
}

function toggleCheckAll(isChecked){
    const inputs = document.getElementsByClassName('table__body')[0].querySelectorAll('.custom-checkbox__input');
    if (inputs) {
        for (let i = 0 ; i < inputs.length; i++) {
            inputs[i].checked = isChecked;
        }
    }
    toggleControllers();
};

function checkInput(isChecked){
    const hasUnchecked = document.getElementsByClassName('table__body')[0].querySelectorAll('input:not(:checked)').length > 0;
    const globalCheckbox = document.getElementById('globalCheckbox');

    if (isChecked && !hasUnchecked) {
        globalCheckbox.checked = true;
    } else {
        globalCheckbox.checked = false;
    }
    toggleControllers();
}

function resetDisplayedRows(rows){
    for ( let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('row--show')) rows[i].classList.remove('row--show');
    }
}

function showSelectedRows(rows, max, currentPage){
    resetDisplayedRows(rows);

    let hasReviewRows = false;

    for ( let j = (currentPage - 1) * max; j < currentPage * max; j++ ) {
        rows[j].classList.add('row--show');
        if (rows[j].classList.contains('row--review')) hasReviewRows = true;
        if (!rows[j + 1]) break;
    }

    if (hasReviewRows) document.getElementById('reviewIndicator').style.display = 'flex';

    const displayedCalendars = document.getElementById('tableData').querySelectorAll('.row--show');
    document.getElementById('displayedCalendars').innerText = displayedCalendars.length;
}

// Pagination

function printTable(currentPage){

    if(currentPage === undefined) {
        currentPage = 1;
    }
    
    const totalCalendars = document.getElementById('tableData').querySelectorAll('.row');
    document.getElementById('totalCalendars').innerText = totalCalendars.length;
    document.getElementById('totalRegisters').innerText = totalCalendars.length;
    
    const maxPerPage = 5;
    const numberPages = Math.ceil(totalCalendars.length / maxPerPage);
    generatePagination(numberPages, currentPage, printTable);
    showSelectedRows(totalCalendars, maxPerPage, currentPage);
}

printTable();

window.toggleCheckAll = toggleCheckAll;
window.checkInput = checkInput;
window.confirmCopy = confirmCopy;
window.printTable = printTable;
