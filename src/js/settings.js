import { generatePagination } from './utils';

import '../styles/settings.scss';
 

function toggleHoliday(selected){
    const autonomicTab = document.getElementById('autonomicTab');
    const autonomicSection = document.getElementById('autonomicSection');
    const nationalTab = document.getElementById('nationalTab');
    const nationalSection = document.getElementById('nationalSection');
    const ccaaSelector = document.getElementById('ccaaSelector');

    if (selected === 'nationalTab') {
        nationalTab.classList.add('holiday-selector__option--selected');
        autonomicTab.classList.remove('holiday-selector__option--selected');
        autonomicSection.style.display = 'none';
        nationalSection.style.display = 'block';
        ccaaSelector.style.display = 'none';
    } else {
        nationalTab.classList.remove('holiday-selector__option--selected');
        autonomicTab.classList.add('holiday-selector__option--selected');
        autonomicSection.style.display = 'block';
        nationalSection.style.display = 'none';
        ccaaSelector.style.display = 'flex';
    }
};

function toggleFilter() {
    const filtersOptions = document.getElementsByClassName('filters__options')[0];
    if (filtersOptions.classList.contains('filters__options--hide')) {
        filtersOptions.classList.remove('filters__options--hide');
        document.getElementById('filterToggleTxt').innerText = 'Ocultar';
    } else {
        filtersOptions.classList.add('filters__options--hide');
        document.getElementById('filterToggleTxt').innerText = 'Mostrar';
    }
}

function saveCalendar() {
    const calendarModal = document.getElementsByClassName('modal')[0];
    const changeNameModal = document.getElementsByClassName('modal')[1];
    calendarModal.style.display = 'none';
    changeNameModal.style.display = 'block';
}

function returnCalendar() {
    const calendarModal = document.getElementsByClassName('modal')[0];
    const changeNameModal = document.getElementsByClassName('modal')[1];
    calendarModal.style.display = 'block';
    changeNameModal.style.display = 'none';
}

function finishCalendarEdition() {
    closeDialog(document.getElementById('popUp'));
    showNotification('Card editada correctamente');
}

function editCalendar() {
    document.getElementById('popUp').style.display = 'flex';
    document.getElementById('calendarModal').style.display = 'block';
}

// Async code
// const autonomicCardsNum = document.getElementById('autonomicSection').querySelectorAll('.holiday').length;
// document.getElementById('autonomicCards').innerText = autonomicCardsNum.toString();

// Pagination (only for national holidays)

function resetDisplayedHolidays(cards) {
    for ( let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains('holiday--show')) cards[i].classList.remove('holiday--show');
    }
}

function showSelectedHolidays(cards, max, currentPage){
    resetDisplayedHolidays(cards);
    for ( let j = (currentPage - 1) * max; j < currentPage * max; j++ ) {
        cards[j].classList.add('holiday--show');
        if (!cards[j + 1]) break;
    }
}

function printHolidays(currentPage = 1) {
    const nationalCards = document.getElementById('nationalSection').querySelectorAll('.holiday');
    const maxPerPage = 10;
    const numberPages = Math.ceil(nationalCards.length / maxPerPage);
    generatePagination(numberPages, currentPage, printHolidays);
    showSelectedHolidays(nationalCards, maxPerPage, currentPage);
}

printHolidays();

window.toggleHoliday = toggleHoliday;
window.toggleFilter = toggleFilter;
window.saveCalendar = saveCalendar;
window.returnCalendar = returnCalendar;
window.editCalendar = editCalendar;
window.finishCalendarEdition = finishCalendarEdition;
window.printHolidays = printHolidays;
