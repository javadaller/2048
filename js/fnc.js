//RANDOM LOCATION
function randomLocation() {
    const row = Math.floor(Math.random() * gridArray.length);
    const column = Math.floor(Math.random() * gridArray[0].length);
    return { row, column };
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
