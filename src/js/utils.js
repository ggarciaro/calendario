import '../public/assets/img/common/ok.svg';
import '../public/assets/img/common/error.svg';
import '../public/assets/img/common/close-gray.svg';
import '../public/assets/img/common/dropdown.svg';

export const holidayTypeDic = {
    diasInhabiles: {
        code: 'off',
        text: 'y días inhábiles',
    },
    fiestasLocales: {
        code: 'local',
        text: 'locales',
    },
    fiestasNacionalesCalendario: {
        code: 'national',
        text: 'nacionales',
        pag: 'National',
    },
    fiestasNacionales: {
        code: 'national',
        text: 'nacionales',
        pag: 'National',
    },
    fiestasAutonomicasCalendario: {
        code: 'autonomic',
        text: 'autonómicas',
        pag: 'Autonomic',
    },
    fiestasAutonomicas: {
        code: 'autonomic',
        text: 'autonómicas',
        pag: 'Autonomic',
    },
};

function toggleFilter(filter) {
    const filtersOptions = filter.querySelector('.filters__options');
    if (filtersOptions.classList.contains('filters__options--hide')) {
        filtersOptions.classList.remove('filters__options--hide');
        document.getElementById('filterToggleTxt').innerText = 'Ocultar';
    } else {
        filtersOptions.classList.add('filters__options--hide');
        document.getElementById('filterToggleTxt').innerText = 'Mostrar';
    }
}

function closeDialog(dialog) {
    return dialog.parentNode.removeChild(dialog);
}

function showNotification(message){
    const notifications = document.getElementById('notifications');
    let newNotification = '';
    newNotification += '<div class="notification">';
    newNotification += '<img class="notification__ok-icon" src="./css/images/ok.svg" alt="Operacion correcta">';
    newNotification += '<p class="notification__text">'+ message +'</p>';
    newNotification += '<img class="notification__close" src="./css/images/close-gray.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)"></div>';

    notifications.insertAdjacentHTML('beforeend', newNotification);
    const createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    setTimeout( function() {
        closeDialog(createdNotification)
    }, 5000); 
}

function showError(message) {
    const notifications = document.getElementById('notifications');
    let newError = '';
    newError += '<div class="notification">';
    newError += '<img class="notification__error-icon" src="./css/images/error.svg" alt="Error">';
    newError += '<p class="notification__text">'+ message +'</p>';
    newError += '<img class="notification__close" src="./css/images/close-gray.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)"></div>';

    notifications.insertAdjacentHTML('beforeend', newError);
    const createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    setTimeout( function() {
        closeDialog(createdNotification)
    }, 5000);
}

function editCalendar(type) {
    const styleCode = holidayTypeDic[type].code;
    const calendarModal = document.getElementById('calendarModal');
    const ccaaSelector = calendarModal.querySelector('#ccaaSelector');
    const modalTitle = document.getElementById('titleHolidayType');

    // Reset modal
    const legendItems = calendarModal.querySelectorAll('.color');
    for (let i = 0; i < legendItems.length; i++){
        legendItems[i].style.display = 'none';
    }
    ccaaSelector.style.display = 'none';
    

    // Set modal data to show
    calendarModal.querySelector('#todayLegend').style.display = 'flex';
    calendarModal.querySelector('#' + styleCode + 'Legend').style.display = 'flex';
    if (styleCode === 'autonomic') {
        ccaaSelector.style.display = 'flex';
    }
    modalTitle.innerHTML = holidayTypeDic[type].text;

    // Show modal
    document.getElementById('popUp').style.display = 'flex';
    calendarModal.style.display = 'block';
}

function saveFestivos() {
    const modal = document.getElementById('calendarModal');
    closeModal(modal);
}

function toggleDaySelection(day, type){
    const className = 'month__item--' + holidayTypeDic[type].code;
    const isSelected = day.classList.contains(className);
    if(isSelected){
        day.classList.remove(className);
    } else {
        day.classList.add(className);
    }
}

export function closeModal(modal, isCalendarCancel = false){

    if (isCalendarCancel === undefined) isCalendarCancel = false;

    const modalContainer = document.getElementById('popUp');
    modalContainer.style.display = 'none';

    if (!isCalendarCancel) {
        modal.style.display = 'none';
    } else {
        const canlendarModal = document.getElementById('calendarModal');
        canlendarModal.style.display = 'none';
    }
}

export function generatePagination(pages, currentPage, func){
    const functionName = func.toString().match(/^function\s*([^\s(]+)/)[1];
    const target = functionName.split('print')[1];
    const pagination = document.getElementById('pagination' + target);
    pagination.innerHTML = '';
    if (pages > 1) {
        // Disable before for the first page
        let beforeBtnFunctionality = '';
        if (currentPage !== 1) {
            beforeBtnFunctionality = 'class="pagination__btn" onclick="'+ functionName +'('+ (currentPage - 1) +')"';
        } else {
            beforeBtnFunctionality = 'class="pagination__btn pagination__btn--disabled"';
        }
        const beforeBtn = '<div ' + beforeBtnFunctionality + '><img src="./css/images/left.svg" alt="Anterior"><p>Anterior</p></div>';

        // Generate pages
        let pagesLinks = '';
        for (let k = 1; k < pages + 1; k++) {
            if (currentPage !== k) {
                pagesLinks += '<p class="pagination__page" onclick="'+ functionName +'('+ k.toString() +')">'+ k +'</p>'
            } else {
                pagesLinks += '<p class="pagination__k pagination__page--selected">'+ k +'</p>'
            }
        }
        
        // Disable next for the last page
        let nextBtnFunctionality = '';
        if (currentPage !== pages) {
            nextBtnFunctionality = 'class="pagination__btn" onclick="'+ functionName +'('+ (currentPage + 1) +')"';
        } else {
            nextBtnFunctionality = 'class="pagination__btn pagination__btn--disabled"';
        }
        const nextBtn = '<div ' + nextBtnFunctionality +'><p>Siguiente</p><img src="./css/images/right.svg" alt="Anterior"></div>';
        pagination.insertAdjacentHTML("afterbegin", beforeBtn + pagesLinks + nextBtn)
    }
}

window.closeDialog = closeDialog;
window.showNotification = showNotification;
window.showError = showError;
window.closeModal = closeModal;
window.editCalendar = editCalendar;
window.toggleDaySelection = toggleDaySelection;
window.toggleFilter = toggleFilter;
window.saveFestivos = saveFestivos;
