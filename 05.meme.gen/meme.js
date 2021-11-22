const memeResults = document.querySelector('.topDiv');
const memeForm = document.querySelector('#memeform');
const imgLink = document.querySelector('input[name="imgLink"]');
const txtTop = document.querySelector('input[name="txtTop"]');
const txtBtm = document.querySelector('input[name="txtBottom"]');
const colorInput = document.querySelector('input[name="color"]');
const fontSize = document.querySelector('input[name="fontsize"]');

// Create Div on Form Submit
memeForm.addEventListener('submit', function(e){
    e.preventDefault();
    const createContainer = document.createElement('div');
    const imgMeme = document.createElement('img');
    const createTop = document.createElement('div');
    const createBtm = document.createElement('div');
    const createOverlay = document.createElement('div');
    const createOvertxt = document.createElement('div');

    //Create container to hold image and text
    createContainer.classList.add('container');
    //Insert Image
    imgMeme.src = imgLink.value;
    imgMeme.classList.add('memeImg');

    //Create div for top text
    createTop.classList.add('txttop');
    createTop.innerText = txtTop.value;
    createTop.style.fontSize = fontSize.value + 'px';
    createTop.style.color = colorInput.value;

    //Create div for bottom text
    createBtm.classList.add('txtbottom');
    createBtm.innerText = txtBtm.value;
    createBtm.style.fontSize = fontSize.value + 'px';
    createBtm.style.color = colorInput.value;

    //Create div for overlay text
    createOverlay.classList.add('overlay');
    createOvertxt.classList.add('text');
    createOvertxt.innerText = ('Click to remove');

    //Append and reset form
    memeResults.appendChild(createContainer);
    createContainer.appendChild(imgMeme);
    createContainer.appendChild(createTop);
    createContainer.appendChild(createBtm);
    createContainer.appendChild(createOverlay);
    createOverlay.appendChild(createOvertxt);
    memeForm.reset();
});

// Remove elements
memeResults.addEventListener('click', function(e){
    if (e.target.className === 'overlay'){
        e.target.parentNode.remove();
        console.log(e.target);
    }
});


// memeResults.addEventListener('click', function(e){
//     // const container = e.target;
//     // taskId.classList.add('remove');
//     // document.getElementsByClassName('.container').forEach(e => e.remove());
//     e.target.remove();
//     console.log(e.target.classList);
// });