import '../styles/detail.scss';

const selectTab = (id) => {
    const tab = id.split('Tab')[0];

    document.getElementsByClassName('tab--selected')[0].classList.remove('tab--selected');
    document.getElementsByClassName('detail__display--selected')[0].classList.remove('detail__display--selected');

    document.getElementById(tab + 'Tab').classList.add('tab--selected');
    document.getElementById(tab + 'Display').classList.add('detail__display--selected');
}

window.selectTab = selectTab;