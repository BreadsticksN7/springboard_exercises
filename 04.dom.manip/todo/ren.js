const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');
let todoItem = document.querySelector('#todoItem');
// const todo = JSON.parse(localStorage.getItem('todo'));

// Pull from storage
const savedList = JSON.parse(localStorage.getItem('todo')) || [];

for (let i = 0; i < savedList.length; i++) {
    const newTodo = document.createElement('li');
    newTodo.innerText = savedList[i].item;
    const newButton = document.createElement('button');

    newButton.innerText = 'Remove';
    newButton.setAttribute('id', savedList[i].id);
    newTodo.isCompleted = savedList[i].isCompleted ? true : false;
    if(newTodo.isCompleted) {
        newTodo.style.textDecoration = 'line-through';
    }
    todoList.appendChild(newTodo);
    newTodo.appendChild(newButton);
}

// Add Item and Remove Button
todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    const newTodo = document.createElement('li');
    const newItem = document.querySelector('#todoItem').value;
    const newButton = document.createElement('button');
    let itemId = { id: new Date().getTime() };
    newButton.innerText = 'Remove';
    newButton.setAttribute('id', itemId.id);
    newTodo.innerText = newItem;
    newTodo.setAttribute('id', itemId.id);
    newTodo.isCompleted = false;
    todoList.appendChild(newTodo);
    newTodo.appendChild(newButton);
    todoForm.reset();

    // Save to storage 
    // Ren: Here I could see you get time and save it as id, this is in number format
    // I change it to string because later on removing item we can avoid conversion
    // Also important fix is, you should assign item value as newItem which is just 'Remove'
    savedList.push({ item: newItem, isCompleted: false, id: new Date().getTime().toString() });
    localStorage.setItem('todo', JSON.stringify(savedList));

});

// Strike Through Item
todoList.addEventListener('click', function(e){
    let clickListItem = e.target;

    // Ren: We know that each remove button has id as attribute
    // So here I'm trying to get that and assign it to variable
    const buttonId = clickListItem.getElementsByTagName('button')[0].getAttribute('id')

    if (!clickListItem.isCompleted){
        clickListItem.style.textDecoration = 'line-through';
        clickListItem.isCompleted = true;
    } else {
        clickListItem.style.textDecoration = 'none';
        clickListItem.isCompleted = false;
    }
    for (let i = 0; i < savedList.length; i++) {
        // Ren: Initially I got an issue i.e the below if statement always fails
        // When looked into it, buttonId was number format whereas savedList.id is in string format
        // Because you use "===" it does a strict validation
        // Thats why we handled in item add function look line 42 and 44
        if (savedList[i].id === buttonId) { //Ren: We can use id for finding items (you already bind that to button attribute)
            savedList[i].isCompleted = !savedList[i].isCompleted;
            localStorage.setItem('todo', JSON.stringify(savedList));
            break; //Ren: After finding the right element, you can break out from the loop
        }
    }
});

// Remove from storage
todoList.addEventListener('click', function(e){
    const taskId = e.target.id;
    if (e.target.tagName === 'BUTTON'){
        e.target.parentNode.remove();
        removeFunc(taskId);
    }
});

// Ren: You just need to get the taskId and filter/remove from the array
// Then replace the array in localstorage
function removeFunc(taskId){
    splicedList = savedList.filter(l => l.id != taskId)
    localStorage.setItem('todo', JSON.stringify(splicedList));
}