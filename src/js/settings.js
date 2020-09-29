import './utils';

const toggleHoliday = (holiday) => {
    if (!holiday.classList.contains('holiday-selector__option--selected')) {
        const previousSelected = document.getElementsByClassName('holiday-selector__option--selected')[0];
        previousSelected.classList.remove('holiday-selector__option--selected');
        holiday.classList.add('holiday-selector__option--selected');
    }
};

const toggleFilter = () => {
    const filtersOptions = document.getElementsByClassName('filters__options')[0];
    if (filtersOptions.classList.contains('filters__options--hide')) {
        filtersOptions.classList.remove('filters__options--hide');
        document.getElementById('filterToggleTxt').innerText = 'Ocultar';
    } else {
        filtersOptions.classList.add('filters__options--hide');
        document.getElementById('filterToggleTxt').innerText = 'Mostrar';
    }
}

const saveCalendar = () => {
    const calendarModal = document.getElementsByClassName('modal')[0];
    const changeNameModal = document.getElementsByClassName('modal')[1];
    calendarModal.style.display = 'none';
    changeNameModal.style.display = 'block';
}

const returnCalendar = () => {
    const calendarModal = document.getElementsByClassName('modal')[0];
    const changeNameModal = document.getElementsByClassName('modal')[1];
    calendarModal.style.display = 'block';
    changeNameModal.style.display = 'none';
}

const finishCalendarEdition = () => {
    closeDialog(document.getElementById('popUp'));
    showNotification('Card editada correctamente');
}

window.toggleHoliday = toggleHoliday;
window.toggleFilter = toggleFilter;
window.saveCalendar = saveCalendar;
window.returnCalendar = returnCalendar;
window.finishCalendarEdition = finishCalendarEdition;