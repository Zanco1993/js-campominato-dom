/*
Consegna

Prima parte
L’utente indica un livello di difficoltà (3 pulsanti) in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
*/

/*
Seconda parte 
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS: quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/

function random(min, max){
    return Math.floor(Math.random() * ((max + 1) - min)) + min
}

const listBomb = [];
function randomNumberBomb(max){

    while (listBomb.length < 16) {
        let randomNum = random(1, max);
        if(!listBomb.includes(randomNum)) {
            listBomb.push(randomNum);
            console.log(randomNum);
        }
    }
}

function createGrill(max){
    for (let i = 1; i <= max; i++) {
        createNewBox(gridContainerHtml, i);
    }
}

function createNewBox(container, n) {
    const square = document.createElement('div');
    square.className = 'box';
    square.innerText = n;
    container.append(square);
    let indexCurrent = 0;

    square.addEventListener('click', function(){
        
        if((listBomb.includes(n))){
            console.log(indexCurrent)
            square.classList.remove('blue'); 
            square.classList.add("red");
        } else {
            indexCurrent++;
            square.classList.add("blue");
            square.classList.remove("red");
            indexCurrent++;
        }
    })
}
    

const buttonEasy = document.querySelector('.easy-difficult');
const buttonMedium = document.querySelector('.medium-difficult');
const buttonHard = document.querySelector('.hard-difficult');
const buttonReset = document.querySelector(".buttons");

const gridContainerHtml = document.getElementById('grid-container');

// pulsante difficoltà facile
buttonEasy.addEventListener('click', function(){
    gridContainerHtml.className = 'easy';
    gridContainerHtml.innerText = ''; 
    createGrill(100);
    randomNumberBomb(100);

})

// pulsante difficoltà media
buttonMedium.addEventListener('click', function(){
    gridContainerHtml.className = 'medium';
    gridContainerHtml.innerText = '';
    createGrill(81);
    randomNumberBomb(81);
})

// pulsante difficoltà difficile
buttonHard.addEventListener('click', function(){
    gridContainerHtml.className = 'hard';
    gridContainerHtml.innerText = '';
    createGrill(49);
    randomNumberBomb(49);
})



