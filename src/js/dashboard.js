const toggleCheckAll = (isChecked) => {
    const inputs = document.getElementsByClassName('table__body')[0].querySelectorAll('.custom-checkbox__input');
    if (inputs) {
        inputs.forEach(input => input.checked = isChecked)
    }
};

window.toggleCheckAll = toggleCheckAll;