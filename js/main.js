//INIT-----------------------------------------
let started=false;
let gridArray,youLoose,score,moves;
const grid=document.querySelector('#grid');
const gridChildren=Array.from(grid.children);
const start=document.querySelector('#start_button');
const scoreDisplay=document.querySelector('#scoreDisplay');
const movesDisplay=document.querySelector('#movesDisplay');

// bouton start
start.addEventListener('click', startGame);

//START GAME-----------------------------------
function startGame() {
    if(!started) {
        start.innerHTML='RESTART';
    }
    started=true;
    youLoose=false;
    moves=0;
    score=0;
    scoreDisplay.innerHTML=score;
    movesDisplay.innerHTML=moves;

    //remettre le tableau à zéro
    gridArray=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

    //effacer les blocs
    gridChildren.forEach(child => {
        child.innerHTML = '';
    });

    //choisir une case au hasard
    const random = randomLocation();
    const parent = document.querySelector('#case'+random.row+random.column);
    const newBox = createBox(parent, 2);
    gridArray[random.row][random.column] = 2;
}

//CLAVIER-------------------------------------------------------------
function handleKeyDown(event) {
    // Retirer l'attribut merged de tous les blocs
    const allBlocks = document.querySelectorAll('.box');
    allBlocks.forEach(block => {
        block.removeAttribute('merged');
    });

    let movePossible = false;

    if(!youLoose) {
        switch(event.key) {
            case "ArrowUp":
                // haut
                for(let x=1; x<4; x++) {
                    for(let y=0; y<4; y++) {
                        if(gridArray[x][y]!=0) {
                            movePossible = moveBlock(x, y, -1, 0,'up') || movePossible;
                        }
                    }
                }
                break;
            case "ArrowDown":
                // bas
                for(let x=2; x>=0; x--) {
                    for(let y=0; y<4; y++) {
                        if(gridArray[x][y]!=0) {
                            movePossible = moveBlock(x, y, 1, 0,'down') || movePossible;
                        }
                    }
                }
                break;
            case "ArrowLeft":
                // gauche
                for(let x=0; x<4; x++) {
                    for(let y=1; y<4; y++) {
                        if(gridArray[x][y]!=0) {
                            movePossible = moveBlock(x, y, 0, -1,'left') || movePossible;
                        }
                    }
                }
                break;
            case "ArrowRight":
                // droite
                for(let x=0; x<4; x++) {
                    for(let y=2; y>=0; y--) {
                        if(gridArray[x][y]!=0) {
                            movePossible = moveBlock(x, y, 0, 1,'right') || movePossible;
                        }
                    }
                }
                break;
            default:
                break;
        }
    }

    if (movePossible) {
        randomBlock();
        moves+=1;
        movesDisplay.innerHTML=moves;
    }

    //logGrid();
    
    // Annuler la frappe de clavier
    if (!movePossible) {
        event.preventDefault();
        gridShaking();
    }
}

document.addEventListener('keyup', handleKeyDown);

//BOUGER LES BLOCS- --------------------------------------

function moveBlock(x, y, dx, dy,direction) {
    const block = document.querySelector("#case" + x + y).firstChild;
    let mergeOccurred = false;
    let moved = false;

    let i = x + dx;
    let j = y + dy;

    while (i >= 0 && i < 4 && j >= 0 && j < 4) {
        if (gridArray[i][j] === 0) {
            // Case vide
            fakeMove(block,direction);
            document.querySelector('#case' + i + j).appendChild(block);
            gridArray[i][j] = gridArray[x][y]; 
            gridArray[x][y] = 0;
            x = i;
            y = j;
            moved = true;
        } else if (gridArray[i][j] === gridArray[x][y] && !mergeOccurred) {
            // Fusion possible
            const newBlock = document.querySelector("#case" + i + j).firstChild;
            if (!newBlock.getAttribute('merged')) {
                const value = gridArray[i][j] * 2;

                // maj tableau
                gridArray[i][j] = value;
                gridArray[x][y] = 0;

                newBlock.innerHTML = value;
                newBlock.classList.remove('box' + (value / 2));
                newBlock.classList.add('box' + value);
                block.remove();
                mergeOccurred = true;
                newBlock.setAttribute('merged', true);

                // maj du score
                score+=value;
                scoreDisplay.innerHTML=score;
            }
            moved = true;
            // animation fusion
            animationFusion(newBlock);
            break;
        } else {
            // Case occupée
            break;
        }
        i += dx;
        j += dy;
    }

    return moved;
}
