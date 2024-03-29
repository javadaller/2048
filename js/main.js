//INIT-----------------------------------------
let started=false;
let gridArray;
const grid=document.querySelector('#grid');
const gridChildren=Array.from(grid.children);
const start=document.querySelector('#start_button');

// bouton start
start.addEventListener('click', startGame);


//SART GAME
function startGame() {
    if(!started) {
        start.innerHTML='RESTART';
    }
    started=true;

    //remettre le tableau à zéro
    gridArray=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    //effecer les boxs
    for(let i=0; i<gridChildren.length; i++) {
        gridChildren[i].innerHTML='';
    }

    //choisir une case au hazard
    const random=randomLocation();
    const parent=document.querySelector('#case'+random.row+random.column);
    const newBox=createBox(parent,2);

}

