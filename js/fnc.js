//RANDOM LOCATION
function randomLocation() {
    const row = Math.floor(Math.random() * gridArray.length);
    const column = Math.floor(Math.random() * gridArray[0].length);
    return { row, column };
}

//----------------------------------------------------

//RANDOM BLOCK
async function randomBlock() {
    //on vérifie si tableau complet
    let count=0;
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if(gridArray[i][j]==0) {
                count+=1;
            }
        }
    }

    //si le tableau n'est pas complet
    if(count>0) {
        const random=randomLocation();
        const parent=document.querySelector('#case'+random.row+random.column);

        //on vérifie si la place est déjà prise
        if(parent.firstChild==null) {
            const newBox=createBox(parent,2);
            gridArray[random.row][random.column]=2;
            newBox.classList.add('blockFadeIn');
            await sleep(100);
            newBox.classList.remove('blockFadeIn');
        } else {
            //sinon on relance
            return randomBlock();
        }
    } else {
        //perdu!
        youLoose=true;
        alert('YOU LOOSE!');
    }
}
//----------------------------------------------------

//LOG GRID
function logGrid() {
    console.log(gridArray[0]);
    console.log(gridArray[1]);
    console.log(gridArray[2]);
    console.log(gridArray[3]);
}

//----------------------------------------------------

// CREATE DIV
function createBox(parent,nb) {
    const newDiv=document.createElement('div');
    newDiv.innerHTML=nb;
    newDiv.classList.add('box','box'+nb);
    parent.appendChild(newDiv);
    return newDiv;
}

//------------------------------------------------------------------------------------------

// SET ATTRIBUTES TO A DIV
function setAttributes(el, attrs) {
for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
}
}

//------------------------------------------------------------------------------------------

// SLEEP FUNCTION
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

//------------------------------------------------------------------------------------------

// GRID SHAKING
async function gridShaking() {
    grid.classList.add('gridShaking');
    await sleep(200);
    grid.classList.remove('gridShaking');
}

//------------------------------------------------------------------------------------------

// ANIMATION FUSION
async function animationFusion(div) {
    div.classList.add('blockFusion');
    await sleep(200);
    div.classList.remove('blockFusion');
}

//------------------------------------------------------------------------------------------

//FAKE MOVE
async function fakeMove(div,direction) {
    let animation;
    const divID=div.parentNode.id;
    const ID=divID.split('');
    console.log(ID);
    switch (direction) {
        case 'up':
            if(ID[4]==0) {return;}
            animation='move'+direction;
            break;

        case 'down':
            animation='move'+direction;
            break;

        case 'left':
            animation='move'+direction;
            break;

        case 'right':
            animation='move'+direction;
            break;
    }
    div.classList.add(animation);
    await sleep(150);
    div.classList.remove(animation);
}