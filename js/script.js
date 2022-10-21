// creo lista delle cose da fare:
/*

COSA BISOGNA FARE:
-Creare la griglia di gioco 
-Creare i quadrati con id ed inserire i numeri
-Genereo bombe id 
-Creare evento click
-Evento click che genera:

 --FiNE GIOCO se bomba
 --coloro casella se buona
 --segno i tentativi in console
 --quando tentativi = caselle buone FINITO GIOCO vinto.

 -FINE GIOCO 
 -- segna il risultato
 -- blocca griglia con un div absolute
 --mi mostra tutte le bombe
 
 -PLAY RESET


-RESET 

--cancello la vecchia griglia
--camcello tutte le bombe


*/


const playBtn  = document.querySelector('#play');
const levelSelect = document.querySelector('#level');
const main = document.querySelector('.game-wrapped');

const gridLevels = [100, 81, 49];
const bombNumber = 16;

// al click di start mi si genera la griglia con i quadrati con i numeri.

playBtn.addEventListener('click', start);
function start() {
    const cellNumbers = gridLevels[levelSelect.value];

    reset();

// vado quindi a creare la griglia èpo attraverso la function
    generatePlayGround(cellNumbers);
}

// funzione per la griglia
function generatePlayGround(cellNumbers){

    const grid = document.createElement('div');
    grid.className = 'grid';

    for(i = 1; i <= cellNumbers; i++){
        const cell = generateCell(i, cellNumbers)
        grid.append(cell);
    }
    main.append(grid);
}

function generateCell(cellId, cellNumbers){
    const cell = document.createElement('div');
    cell.className = 'cell';

    cell.classList.add('square'+cellNumbers);

    cell.cellId = cellId;
    cell.innerHTML = `<span>${cellId}</span>`;
    return cell;
}




// agg function reset per far si che al click si resetti tutto
function reset(){
    main.innerHTML = '';
}