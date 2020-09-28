const closeDialog = (dialog) => dialog.remove();

const showDialog = (type) => {
    const notifications = document.getElementById('notifications');
    // Different img paths than html
    const newNotification = `
        <div class="notification">
            <p class="notification__text">Card ${type} correctamente</p>
            <img class="notification__close" src="./assets/img/close.svg" alt="Cerrar" onclick="closeDialog(this.parentElement)">
        </div>
    `;
    notifications.insertAdjacentHTML('beforeend', newNotification);
    const createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    setTimeout( () => closeDialog(createdNotification), 5000); 
}

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

window.closeDialog = closeDialog;
window.showDialog = showDialog;
window.toggleHoliday = toggleHoliday;
window.toggleFilter = toggleFilter;