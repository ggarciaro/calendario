import '../styles/profiles.scss'
import { locateModal, closeModal, generatePagination} from './utils';

function resetDisplayedProfiles(rows){
    for ( let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('row--show')) rows[i].classList.remove('row--show');
    }
}

function showSelectedProfiles(rows, max, currentPage){
    resetDisplayedProfiles(rows);

    for ( let j = (currentPage - 1) * max; j < currentPage * max; j++ ) {
        rows[j].classList.add('row--show');
        if (!rows[j + 1]) break;
    }

    const displayedProfiles = document.getElementById('contenidoTablaPerfiles').querySelectorAll('.row--show');
    document.getElementById('displayedProfiles').innerText = displayedProfiles.length;
}

// Pagination

function printProfilesTable(currentPage){

    if(currentPage === undefined) {
        currentPage = 1;
    }
    
    const totalProfiles = document.getElementById('contenidoTablaPerfiles').querySelectorAll('.row');
    console.log(totalProfiles)
    document.getElementById('totalProfiles').innerText = totalProfiles.length;
    
    const maxPerPage = 10;
    const numberPages = Math.ceil(totalProfiles.length / maxPerPage);
    generatePagination(numberPages, currentPage, printProfilesTable);
    showSelectedProfiles(totalProfiles, maxPerPage, currentPage);
}

printProfilesTable();

//Nuevo perfil

function crearNuevoPerfil(){
    const modal = document.getElementById('perfilModal');
    locateModal();
    modal.style.display = 'block';
}

function toggleGEPcheckbox(editarChecked){
    const gepCheckbox = document.getElementById('checkboxGEPPerfil');
    const gepField = document.getElementById('gepPerfilField');
    if (editarChecked){
        gepField.classList.remove('field--disabled');
    } else {
        gepCheckbox.checked = false;
        gepField.classList.add('field--disabled');
    }
}

window.printProfilesTable = printProfilesTable;
window.crearNuevoPerfil = crearNuevoPerfil;
window.toggleGEPcheckbox = toggleGEPcheckbox;