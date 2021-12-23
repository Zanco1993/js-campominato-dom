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

function reset(){
    gridContainerHtml.innerHTML = "";

}

function random(min, max){
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}


function randomNumberBomb(max){
    const listBomb = [];
    while (listBomb.length < 16) {
        let randomNum = random(1, max); //numero randomico da 1 a valore caselle per difficoltà
        if(!listBomb.includes(randomNum)) {
            listBomb.push(randomNum);
        }
    }
    return listBomb; // il return serve per far vedere all'esterno il valore
                     // altrimenti sarebbe undefined!!!
}


function gameOver(isWin, score, container) {
    const modal = document.createElement('div');
    modal.className = 'gameOver';
    if(isWin){
        modal.classList.add('winner');
        modal.innerText = 'Hai vinto ';
    } else {
        modal.classList.add('loser');
        modal.innerText = 'Hai perso ';
    }

    modal.innerText += `il tuo punteggio è: ${score}`;

    // creo un bottone ricomincia e facciamo in modo di resettare il gioco
    const button = document.createElement('button');
    button.innerText = 'Ricomincia';
    button.addEventListener('click', reset);

    modal.append(button);
    container.append(modal);
}


function createGrill(max, container, bombFunction){

    let indexCurrent = 0;
    const bombs = bombFunction(max); 
    console.log(bombs)
    
    for (let i = 1; i <= max; i++) {
        // dichiaro la costante bombs che rappresenta l'array listBomb
        // della funzione randomNumberBomb

        // creo il div con class box e con innerText segniamo il numero casella
        const square = document.createElement('div');
        square.className = 'box';
        square.innerText = i;
        container.append(square);
    
        square.addEventListener('click', function(){ 
            if(bombs.includes(i)){
                square.classList.add("red");
                gameOver(false, indexCurrent, container)

            } else {
                square.classList.add("blue");
                indexCurrent++;

                // se il numero di click è uguale al numero consentito di click,
                // allora l'utente ha vinto
                if(indexCurrent === max - 16) {
                    gameOver(true, indexCurrent, container);
                }
                
            }
        })
    
    }
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
    createGrill(100, gridContainerHtml, randomNumberBomb);
})

// pulsante difficoltà media
buttonMedium.addEventListener('click', function(){
    gridContainerHtml.className = 'medium';
    gridContainerHtml.innerText = '';
    createGrill(81, gridContainerHtml, randomNumberBomb);
})

// pulsante difficoltà difficile
buttonHard.addEventListener('click', function(){
    gridContainerHtml.className = 'hard';
    gridContainerHtml.innerText = '';
    createGrill(49, gridContainerHtml, randomNumberBomb);
})



