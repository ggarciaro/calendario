import { generatePagination, holidayTypeDic } from './utils';

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

function duplicateCard(btn, type){
    const card = btn.parentElement.parentElement.parentElement.parentElement.parentElement;
    const newCard = card.cloneNode(true);
    const functionName = 'print' + holidayTypeDic[type].pag + 'Holidays';
    newCard.classList.add('holiday--copy');
    card.parentNode.insertBefore(newCard, card.previousSibling);
    window['func_', functionName]();
    showNotification('Card duplicada correctamente');
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

function printNationalHolidays(currentPage) {
    if(currentPage === undefined) {
        currentPage = 1;
    }
    const nationalCards = document.getElementById('nationalSection').querySelectorAll('.holiday');
    const maxPerPage = 10;
    const numberPages = Math.ceil(nationalCards.length / maxPerPage);
    generatePagination(numberPages, currentPage, printNationalHolidays);
    showSelectedHolidays(nationalCards, maxPerPage, currentPage);
}

function printAutonomicHolidays(currentPage) {
    if(currentPage === undefined) {
        currentPage = 1;
    }
    const autonomicCards = document.getElementById('autonomicSection').querySelectorAll('.holiday');
    const maxPerPage = 10;
    const numberPages = Math.ceil(autonomicCards.length / maxPerPage);
    generatePagination(numberPages, currentPage, printAutonomicHolidays);
    showSelectedHolidays(autonomicCards, maxPerPage, currentPage);
}

printNationalHolidays();
printAutonomicHolidays();

window.toggleHoliday = toggleHoliday;
window.saveCalendar = saveCalendar;
window.returnCalendar = returnCalendar;
window.finishCalendarEdition = finishCalendarEdition;
window.printNationalHolidays = printNationalHolidays;
window.printAutonomicHolidays = printAutonomicHolidays;
window.duplicateCard = duplicateCard;
