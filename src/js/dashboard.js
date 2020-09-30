const toggleControllers = () => {
    const checkedInputs = document.getElementsByClassName('table__body')[0].querySelector('input:checked');
    const controllers = document.getElementById('tableControllers');
    const dashboardContainer = document.getElementById('dashboardContainer');

    if (checkedInputs) {
        controllers.style.display = 'flex';
        dashboardContainer.style.padding = '1rem 2rem 7rem 2rem';
    } else {
        controllers.style.display = 'none';
        dashboardContainer.style.padding = '1rem 2rem';
    }
}

const toggleCheckAll = (isChecked) => {
    const inputs = document.getElementsByClassName('table__body')[0].querySelectorAll('.custom-checkbox__input');
    if (inputs) {
        for (input of inputs) {
            input.checked = isChecked;
        }
    }
    toggleControllers();
};

window.toggleControllers = toggleControllers;
window.toggleCheckAll = toggleCheckAll;