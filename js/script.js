// creo lista delle cose da fare:
/*

COSA BISOGNA FARE:
-Creare la griglia di gioco 
-Creare i quadrati con id ed inserire i numeri
-Genereo bombe id 
-----------------------------------------------
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
// numero di bombe che si vanno a generare
const bombNumber = 16;
let bombs = [];
let score = 0;

// al click di start mi si genera la griglia con i quadrati con i numeri.

playBtn.addEventListener('click', start);

// cell.addEventListener('click', function(){
//     cell.className.add('clicked')
// })

function start() {
    const cellNumbers = gridLevels[levelSelect.value];

    reset();

// vado quindi a creare la griglia èpo attraverso la function
    generatePlayGround(cellNumbers);
    bombs = generateBombs(cellNumbers);
    console.log(bombs);
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
    cell.addEventListener('click', clickcell);
    return cell;
}

function clickcell(){
    // vado a vedere se ho pestato una clickato una bomba o una cella buona
    if(!bombs.includes(this.cellId)){

        
        // accendo in questo modo la casella che è corretta
        this.classList.add('clicked');
        score++;
        console.log(score);


        const cells = document.getElementsByClassName('cell');
        if(score === cells.length - bombNumber){
            endGame(true);
        }

    }else{
        // accendo in questo modo la casella che è una bomba.
        this.classList.add('bomb');
        endGame(false);
    }
}

function endGame(isWin) {

    let msg;
    const cells = document.getElementsByClassName('cell');

    if(isWin){
        msg = `Hai cliccato tutte le celle giuste hai vinto`
        console.log('Vinto');
    }else{
        msg = `Hai cliccato una bomba hai perso, il tuo puntrggio si ferma a ${score} su ${cells.length - bombNumber} punti disponibili`
        console.log('Perso hai fatto ${score}');
    }
    document.querySelector('.fineGioco').innerHTML = msg;
    showBombs();
    
}

function showBombs(){
    const cells = document.getElementsByClassName('cell');

    for(let i = 0; i < cells.length; i++){
        const cell = cells[i];
        if (bombs.includes(cell.cellId)) {
            cell.classList.add('bomb')            
        }
    }
}

function generateBombs(cellNumbers){

    const bombsGenerated = [];
// faccio un ciclo per creare il numero di bombe che mi serve da 1 bombnumb  che è 16
    while(bombsGenerated.length < bombNumber){
        // poi prendo i numeri ranodm generati 
        const bomb = generateRandomNumber(1, cellNumbers);
        console.log(bomb);
        if(!bombsGenerated.includes(bomb)){
            bombsGenerated.push(bomb);
        }
    }
    
    return bombsGenerated;
}

function generateRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// agg function reset per far si che al click si resetti tutto
function reset(){
    main.innerHTML = '';
    score = 0;
    document.querySelector('.fineGioco').innerHTML = '';
}