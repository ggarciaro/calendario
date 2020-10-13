import { closeModal, generatePagination } from './utils';
import '../styles/detail.scss';

function selectTab (id){
    const tab = id.split('Tab')[0];

    document.getElementsByClassName('tab--selected')[0].classList.remove('tab--selected');
    document.getElementsByClassName('detail__display--selected')[0].classList.remove('detail__display--selected');

    document.getElementById(tab + 'Tab').classList.add('tab--selected');
    document.getElementById(tab + 'Display').classList.add('detail__display--selected');
}

function showTemplateModal() {
    document.getElementById('popUp').style.display = 'flex';
    document.getElementById('templateModal').style.display = 'block';

    const selectedRow = document.querySelector('.template-table__row--selected');
    if (selectedRow) {

        selectedRow.classList.remove('template-table__row--selected');

        const selectBtn = document.getElementById('selectTemplateBtn');
        selectBtn.removeAttribute('onclick');
        selectBtn.classList.add('modal-btn--disabled');
    };
}

function importTemplate(text) {
    const observationsTextarea = document.getElementById('calendariosVO_observaciones');
    observationsTextarea.value += ' '+ text;

    const templateModal = document.getElementById('templateModal');
    closeModal(templateModal);
}

function copySelectedRow() {
    const selectedRow = document.querySelector('.template-table__row--selected');
    importTemplate(selectedRow.innerText);
}

function selectRow(row) {
    const selectedRow = document.querySelector('.template-table__row--selected');
    if (selectedRow) {
        selectedRow.classList.remove('template-table__row--selected');
    } else {
        const selectBtn = document.getElementById('selectTemplateBtn');
        selectBtn.onclick = copySelectedRow;
        selectBtn.classList.remove('modal-btn--disabled');
    }
    row.classList.add('template-table__row--selected');
}

function resetDisplayedTemplates(templates) {
    for ( let i = 0; i < templates.length; i++) {
        if (templates[i].classList.contains('template-table__row--show')) templates[i].classList.remove('template-table__row--show');
    }
}

function showSelectedTemplates(templates, max, currentPage){
    resetDisplayedTemplates(templates);
    for ( let j = (currentPage - 1) * max; j < currentPage * max; j++ ) {
        templates[j].classList.add('template-table__row--show');
        if (!templates[j + 1]) break;
    }
}

function printTemplates(currentPage) {

    if(currentPage === undefined) {
        currentPage = 1;
    }
    
    const templates = document.getElementsByClassName('template-table__row');
    const maxPerPage = 5;
    const numberPages = Math.ceil(templates.length / maxPerPage);
    generatePagination(numberPages, currentPage, printTemplates);
    showSelectedTemplates(templates, maxPerPage, currentPage);
}

printTemplates();

const date = new Date();

$(".datepicker").datepicker({
    minDate: new Date(date.getFullYear(), 0, 1),
    maxDate: new Date(date.getFullYear(), 11, 31),
});

window.selectTab = selectTab;
window.showTemplateModal = showTemplateModal;
window.selectRow = selectRow;
window.importTemplate = importTemplate;
window.printTemplates = printTemplates;
