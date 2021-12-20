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
    container.append(square);
    square.addEventListener('click', function(){

        //al click, se i numeri presenti nell'array sono inclusi 
        // nel numero di quadrato selezionato,
        // allora aggiungi una classe rosso 
        // altrimenti lascia blu
        if(listBomb.includes(n)){
            square.classList.remove('blue'); 
            square.classList.add("red"); 
            alert("Mi dispiace, hai perso la partita!!!")   
            // const reset = document.createElement('button');
            // reset.className = 'riavvio';
            // buttons.append(reset);
            // const buttonReset = document.querySelector(".buttons .button.reset")
            // buttonReset.innerHTML = "RESET PLAY";
        }else {
            square.classList.add("blue");
            square.classList.remove("red");
        }

    })
}
    








const gridContainerHtml = document.querySelector('.grid-container');
const buttonEasy = document.querySelector('.easy-difficult');
const buttonMedium = document.querySelector('.medium-difficult');
const buttonHard = document.querySelector('.hard-difficult');

buttonEasy.addEventListener('click', function(){
    gridContainerHtml.innerHTML = "";
    gridContainerHtml.classList.add("easy");
    gridContainerHtml.classList.remove("medium", "hard");
    randomNumberBomb(100);
    createGrill(100);

})

buttonMedium.addEventListener('click', function(){
    gridContainerHtml.innerHTML = "";
    gridContainerHtml.classList.add("medium");
    gridContainerHtml.classList.remove("easy", "hard");
    randomNumberBomb(81);
    createGrill(81);
})

buttonHard.addEventListener('click', function(){
    gridContainerHtml.innerHTML = "";
    gridContainerHtml.classList.add("hard");
    gridContainerHtml.classList.remove("medium", "easy");
    randomNumberBomb(49);
    createGrill(49);
})

