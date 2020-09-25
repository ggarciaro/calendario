
const closeDialog = (dialog) => dialog.style.display = 'none';

const showDialog = (type) => {
    const notifications = document.getElementById('notifications');
    // Different img paths than html
    const newNotification = `
        <div class="notification">
            <p class="notification__text">Card ${type} correctamente</p>
            <img class="notification__close" src="./assets/img/close.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)">
        </div>
    `
    notifications.insertAdjacentHTML('beforeend', newNotification)
}

const duplicateCard = (card) => {
} 

window.closeDialog = closeDialog;

window.showDialog = showDialog;