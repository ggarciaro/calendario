const closeDialog = (dialog) => dialog.parentNode.removeChild(dialog);

const showNotification = (message) => {
    const notifications = document.getElementById('notifications');
    // Different img paths than html
    const newNotification = `
        <div class="notification">
            <img class="notification__ok-icon" src="./assets/img/ok.svg" alt="Operacion correcta">
            <p class="notification__text">${message}</p>
            <img class="notification__close" src="./assets/img/close-gray.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)">
        </div>
    `;
    notifications.insertAdjacentHTML('beforeend', newNotification);
    const createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    setTimeout( () => closeDialog(createdNotification), 5000); 
}

window.closeDialog = closeDialog;
window.showNotification = showNotification;