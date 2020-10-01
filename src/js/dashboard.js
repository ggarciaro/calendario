import '../styles/dashboard.scss';

const toggleControllers = () => {
    const hasCheckedInputs = document.getElementsByClassName('table__body')[0].querySelectorAll('input:checked').length > 0;
    const controllers = document.getElementById('tableControllers');
    const dashboardContainer = document.getElementById('dashboardContainer');

    if (hasCheckedInputs) {
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
        for (let i = 0 ; i < inputs.length; i++) {
            inputs[i].checked = isChecked;
        }
    }
    toggleControllers();
};

const checkInput = (isChecked) => {
    const hasUnchecked = document.getElementsByClassName('table__body')[0].querySelectorAll('input:not(:checked)').length > 0;
    const globalCheckbox = document.getElementById('globalCheckbox');
    if (isChecked && !hasUnchecked) {
        globalCheckbox.checked = true;
    } else {
        globalCheckbox.checked = false;
    }
    toggleControllers();
}



window.toggleCheckAll = toggleCheckAll;
window.checkInput = checkInput;