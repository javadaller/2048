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
    //effecer les boxs
    for(let i=0; i<gridChildren.length; i++) {
        gridChildren[i].innerHTML='';
    }

    //choisir une case au hazard
    const random=randomLocation();
    const parent=document.querySelector('#case'+random.row+random.column);
    const newBox=createBox(parent,2);
    gridArray[random.row][random.column]=2;
}

//CLAVIER-------------------------------------------------------------
function handleKeyDown(event) {
    // Retirer l'attribut 'merged' de tous les blocs
    const allBlocks = document.querySelectorAll('.box');
    allBlocks.forEach(block => {
        block.removeAttribute('merged');
    });

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
            randomBlock();
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
            randomBlock();
            break;
        case "ArrowLeft":
            // gauche
            for(let x=0; x<4; x++) {
                for(let y=1; y<4; y++) {
                    if(gridArray[x][y]!=0) {
                        moveBlockLeft(x,y);
                    }
                }
            }
            randomBlock();
            break;
        case "ArrowRight":
            // droite
            for(let x=0; x<4; x++) {
                for(let y=2; y>=0; y--) {
                    if(gridArray[x][y]!=0) {
                        moveBlockRight(x,y);
                    }
                }
            }
            randomBlock();
            break;
        default:
            break;
    }
    logGrid();
}
document.addEventListener('keyup', handleKeyDown);

//BOUGER LES BLOCS- --------------------------------------

function moveBlockUp(x, y) {
    const block = document.querySelector("#case" + x + y).firstChild;
    let mergeOccurred = false;
    for (let i = x - 1; i >= 0; i--) {
        if (gridArray[i][y] === 0) {
            // Case vide
            document.querySelector('#case' + i + y).appendChild(block);
            gridArray[i][y] = gridArray[x][y]; 
            gridArray[x][y] = 0;
            x = i;
        } else {
            // Case occupée
            if (gridArray[i][y] === gridArray[x][y] && !mergeOccurred) {
                const newBlock = document.querySelector("#case" + i + y).firstChild;
                if (!newBlock.getAttribute('merged')) {
                    const value = gridArray[i][y] * 2;
                    gridArray[i][y] = value;
                    gridArray[x][y] = 0;
                    newBlock.innerHTML = value;
                    newBlock.classList.remove('box' + (value / 2));
                    newBlock.classList.add('box' + value);
                    block.remove();
                    mergeOccurred = true;
                    newBlock.setAttribute('merged', true);
                }
            }
            break;
        }
    }
}

function moveBlockDown(x, y) {
    const block = document.querySelector("#case" + x + y).firstChild;
    let mergeOccurred = false;
    for (let i = x + 1; i < 4; i++) {
        if (gridArray[i][y] === 0) {
            // Case vide
            document.querySelector('#case' + i + y).appendChild(block);
            gridArray[i][y] = gridArray[x][y]; 
            gridArray[x][y] = 0;
            x = i;
        } else {
            // Case occupée
            if (gridArray[i][y] === gridArray[x][y] && !mergeOccurred) {
                const newBlock = document.querySelector("#case" + i + y).firstChild;
                if (!newBlock.getAttribute('merged')) {
                    const value = gridArray[i][y] * 2;
                    gridArray[i][y] = value;
                    gridArray[x][y] = 0;
                    newBlock.innerHTML = value;
                    newBlock.classList.remove('box' + (value / 2));
                    newBlock.classList.add('box' + value);
                    block.remove();
                    mergeOccurred = true;
                    newBlock.setAttribute('merged', true);
                }
            }
            break;
        }
    }
}

function moveBlockLeft(x, y) {
    const block = document.querySelector("#case" + x + y).firstChild;
    let mergeOccurred = false;
    for (let j = y - 1; j >= 0; j--) {
        if (gridArray[x][j] === 0) {
            // Case vide
            document.querySelector('#case' + x + j).appendChild(block);
            gridArray[x][j] = gridArray[x][j + 1]; 
            gridArray[x][j + 1] = 0;
            y = j;
        } else {
            // Case occupée
            if (gridArray[x][j] === gridArray[x][y] && !mergeOccurred) {
                const newBlock = document.querySelector("#case" + x + j).firstChild;
                if (!newBlock.getAttribute('merged')) {
                    const value = gridArray[x][j] * 2;
                    gridArray[x][j] = value;
                    gridArray[x][y] = 0;
                    newBlock.innerHTML = value;
                    newBlock.classList.remove('box' + (value / 2));
                    newBlock.classList.add('box' + value);
                    block.remove();
                    mergeOccurred = true;
                    newBlock.setAttribute('merged', true);
                }
            }
            break;
        }
    }
}

function moveBlockRight(x, y) {
    const block = document.querySelector("#case" + x + y).firstChild;
    let mergeOccurred = false;
    for (let j = y + 1; j < 4; j++) {
        if (gridArray[x][j] === 0) {
            // Case vide
            document.querySelector('#case' + x + j).appendChild(block);
            gridArray[x][j] = gridArray[x][j - 1]; 
            gridArray[x][j - 1] = 0;
            y = j;
        } else {
            // Case occupée
            if (gridArray[x][j] === gridArray[x][y] && !mergeOccurred) {
                const newBlock = document.querySelector("#case" + x + j).firstChild;
                if (!newBlock.getAttribute('merged')) {
                    const value = gridArray[x][j] * 2;
                    gridArray[x][j] = value;
                    gridArray[x][y] = 0;
                    newBlock.innerHTML = value;
                    newBlock.classList.remove('box' + (value / 2));
                    newBlock.classList.add('box' + value);
                    block.remove();
                    mergeOccurred = true;
                    newBlock.setAttribute('merged', true);
                }
            }
            break;
        }
    }
}
