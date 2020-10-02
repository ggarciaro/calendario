import '../public/assets/img/common/ok.svg';
import '../public/assets/img/common/close-gray.svg';
import '../public/assets/img/common/dropdown.svg';


const closeDialog = (dialog) => dialog.parentNode.removeChild(dialog);

const showNotification = (message) => {
    const notifications = document.getElementById('notifications');
    // Different img paths than html
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

window.closeDialog = closeDialog;
window.showNotification = showNotification;
window.closeModal = closeModal;