//RANDOM LOCATION
function randomLocation() {
    const row = Math.floor(Math.random() * gridArray.length);
    const column = Math.floor(Math.random() * gridArray[0].length);
    return { row, column };
}

//----------------------------------------------------

//RANDOM BLOCK
function randomBlock() {
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
        } else {
            //sinon on relance
            return randomBlock();
        }
    } else {
        //perdu!
        console.log('LOSER');
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
