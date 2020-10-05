import '../public/assets/img/common/ok.svg';
import '../public/assets/img/common/error.svg';
import '../public/assets/img/common/close-gray.svg';
import '../public/assets/img/common/dropdown.svg';


const closeDialog = (dialog) => dialog.parentNode.removeChild(dialog);

const showNotification = (message) => {
    const notifications = document.getElementById('notifications');
    const newNotification = `
        <div class="notification">
            <img class="notification__ok-icon" src="./css/images/ok.svg" alt="Operacion correcta">
            <p class="notification__text">${message}</p>
            <img class="notification__close" src="./css/images/close-gray.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)">
        </div>
    `;
    notifications.insertAdjacentHTML('beforeend', newNotification);
    const createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    setTimeout( () => closeDialog(createdNotification), 5000); 
}
const showError = (message) => {
    const notifications = document.getElementById('notifications');
    const newError = `
        <div class="notification">
            <img class="notification__error-icon" src="./css/images/error.svg" alt="Operacion correcta">
            <p class="notification__text">${message}</p>
            <img class="notification__close" src="./css/images/close-gray.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)">
        </div>
    `;
    notifications.insertAdjacentHTML('beforeend', newError);
    const createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    setTimeout( () => closeDialog(createdNotification), 5000); 
}

const closeModal = (modal, isCalendarCancel = false) => {
    const modalContainer = document.getElementById('popUp');
    modalContainer.style.display = 'none';

    if (!isCalendarCancel) {
        modal.style.display = 'none';
    } else {
        const canlendarModal = document.getElementById('calendarModal');
        canlendarModal.style.display = 'none';
    }
}

export const generatePagination = (pages, currentPage) => {
    if (pages > 1) {
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
}

window.closeDialog = closeDialog;
window.showNotification = showNotification;
window.showError = showError;
window.closeModal = closeModal;