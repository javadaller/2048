//INIT-----------------------------------------
let started=false;
let gridArray;
const grid=document.querySelector('#grid');
const gridChildren=Array.from(grid.children);
const start=document.querySelector('#start_button');

// bouton start
start.addEventListener('click', startGame);

//START GAME-----------------------------------
function startGame() {
    if(!started) {
        start.innerHTML='RESTART';
    }
    started=true;

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
async function handleKeyDown(event) {
    // Retirer l'attribut merged de tous les blocs
    const allBlocks = document.querySelectorAll('.box');
    allBlocks.forEach(block => {
        block.removeAttribute('merged');
    });

    let movePossible = false;

    switch(event.key) {
        case "ArrowUp":
            // haut
            for(let x=1; x<4; x++) {
                for(let y=0; y<4; y++) {
                    if(gridArray[x][y]!=0) {
                        movePossible = await moveBlock(x, y, -1, 0) || movePossible;
                    }
                }
            }
            break;
        case "ArrowDown":
            // bas
            for(let x=2; x>=0; x--) {
                for(let y=0; y<4; y++) {
                    if(gridArray[x][y]!=0) {
                        movePossible = await moveBlock(x, y, 1, 0) || movePossible;
                    }
                }
            }
            break;
        case "ArrowLeft":
            // gauche
            for(let x=0; x<4; x++) {
                for(let y=1; y<4; y++) {
                    if(gridArray[x][y]!=0) {
                        movePossible = await moveBlock(x, y, 0, -1) || movePossible;
                    }
                }
            }
            break;
        case "ArrowRight":
            // droite
            for(let x=0; x<4; x++) {
                for(let y=2; y>=0; y--) {
                    if(gridArray[x][y]!=0) {
                        movePossible = await moveBlock(x, y, 0, 1) || movePossible;
                    }
                }
            }
            break;
        default:
            break;
    }

    if (movePossible) {
        randomBlock();
    }

    logGrid();
    
    // Annuler la frappe de clavier
    if (!movePossible) {
        event.preventDefault();
        grid.classList.add('gridShaking');
        await sleep(200);
        grid.classList.remove('gridShaking');
    }
}

document.addEventListener('keyup', handleKeyDown);

//BOUGER LES BLOCS- --------------------------------------

async function moveBlock(x, y, dx, dy) {
    const block = document.querySelector("#case" + x + y).firstChild;
    let mergeOccurred = false;
    let moved = false;

    let i = x + dx;
    let j = y + dy;

    while (i >= 0 && i < 4 && j >= 0 && j < 4) {
        if (gridArray[i][j] === 0) {
            // Case vide
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
                gridArray[i][j] = value;
                gridArray[x][y] = 0;
                newBlock.innerHTML = value;
                newBlock.classList.remove('box' + (value / 2));
                newBlock.classList.add('box' + value);
                block.remove();
                mergeOccurred = true;
                newBlock.setAttribute('merged', true);
            }
            moved = true;
            // animation fusion
            newBlock.classList.add('blockFusion');
            await sleep(200);
            newBlock.classList.remove('blockFusion');
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
