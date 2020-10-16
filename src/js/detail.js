import { closeModal, generatePagination, holidayTypeDic } from './utils';
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

function toggleCCAA(country) {
    let htmlString = '';
    if (country === 'ESP') {
        htmlString += '<div class="combo"><p class="combo__tag">CCAA:</p><div class="combo__options">';
        htmlString += '<select name="calendariosVO_codCCAA" id="calendariosVO_codCCAA">';
        htmlString += '<option value="">CASTILLA LA MANCHA</option>';
        htmlString += '</select></div></div>';
    } else {
        htmlString += '<div class="field">';
        htmlString += '<label>Referencia:</label>';
        htmlString += '<input id="calendariosVO_codCCAA" type="text"></div>';
    }
    $('#refCombo').html(htmlString);
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

$(".datepicker").datepicker({
    minDate: new Date(2020, 0, 1),
    maxDate: new Date(2020, 11, 31),
});

function confirmAllHolidayDelete(type) {
    const confirmModal = document.getElementById('deleteAllHoliday'); 
    document.getElementById('deletSelectedHoliday').innerHTML = holidayTypeDic[type].text;
    document.getElementById('popUp').style.display = 'flex';
    confirmModal.style.display = 'block';
}

function confirmOneHolidayDelete(holiday) {
    const date = holiday.querySelector('p').innerHTML;
    document.getElementById('deletSelectedDate').innerHTML = date;
    const confirmModal = document.getElementById('deleteOneHoliday'); 
    document.getElementById('popUp').style.display = 'flex';
    confirmModal.style.display = 'block';
}

function isIE() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    const is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    
    return is_ie; 
}

if (!isIE()){
    mdtimepicker({is24hour: true});
}



window.selectTab = selectTab;
window.showTemplateModal = showTemplateModal;
window.selectRow = selectRow;
window.importTemplate = importTemplate;
window.printTemplates = printTemplates;
window.toggleCCAA = toggleCCAA;
window.confirmAllHolidayDelete = confirmAllHolidayDelete;
window.confirmOneHolidayDelete = confirmOneHolidayDelete;
