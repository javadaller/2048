//INIT-----------------------------------------
let started=false;
let gridArray;
const grid=document.querySelector('#grid');
const gridChildren=Array.from(grid.children);
const start=document.querySelector('#start_button');

// bouton start
start.addEventListener('click', startGame);


//START GAME
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
    gridArray[random.row][random.column]=2;
    console.log(gridArray);
}

//CLAVIER
function handleKeyDown(event) {
    switch(event.key) {
        case "ArrowUp":
            // haut
            for(let x=1; x<4; x++) { //row
                for(let y=0; y<4; y++) { //column
                    if(gridArray[x][y]!=0) {
                        moveBlockUp(x,y);
                    }
                }
            }
            break;
        case "ArrowDown":
            // bas
            for(let x=2; x>=0; x--) { //row
                for(let y=0; y<4; y++) { //column
                    if(gridArray[x][y]!=0) {
                        moveBlockDown(x,y);
                    }
                }
            }
            break;
        case "ArrowLeft":
            // gauche
            for(let y=0; y<4; y++) { //row
                for(let x=0; x<4; x++) { //column
                    if(gridArray[x][y]!=0) {
                        moveBlockUp(x,y);
                    }
                }
            }
            break;
        case "ArrowRight":
            // droite

            break;
        default:
            break;
    }
}
document.addEventListener('keyup', handleKeyDown);

//BOUGER LES BLOCS- ------------------------------

function moveBlockUp(x,y) {
    const block=document.querySelector("#case"+x+y).firstChild;
    for(let i=x-1; i>=0; i--) {
        if(gridArray[i][y]==0) {
            //bloc libre
            document.querySelector('#case'+i+y).appendChild(block);
            gridArray[i][y] = gridArray[i+1][y]; 
            gridArray[i+1][y] = 0;
            console.log(gridArray);
        } else {
            //case occupée
            break;
        }
    }   
}

function moveBlockDown(x,y) {
    const block=document.querySelector("#case"+x+y).firstChild;
    for(let i=x+1; i<4; i++) {
        if(gridArray[i][y]==0) {
            //bloc libre
            document.querySelector('#case'+i+y).appendChild(block);
            gridArray[i][y] = gridArray[i-1][y]; 
            gridArray[i-1][y] = 0;
            console.log(gridArray);
        } else {
            //case occupée
            break;
        }
    } 
}