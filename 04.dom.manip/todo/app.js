const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');
let todoItem = document.querySelector('#todoItem');


// Pull from storage
const savedList = JSON.parse(localStorage.getItem('todo')) || [];

for (let i = 0; i < savedList.length; i++) {
const newTodo = document.createElement('li');
newTodo.innerText = savedList[i].item;
const newButton = document.createElement('button');
// let itemId = { id: new Date().getTime() };

newButton.innerText = 'Remove';
newButton.setAttribute('id', savedList[i].id);
newTodo.isCompleted = savedList[i].isCompleted ? true : false;
if(newTodo.isCompleted) {
    newTodo.style.textDecoration = 'line-through';
}
todoList.appendChild(newTodo);
newTodo.appendChild(newButton);

}
todoForm.addEventListener('click', function(e){
    console.log(e.target);
})
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
    savedList.push({ item: newItem, isCompleted: false, id: new Date().getTime().toString() });
    localStorage.setItem('todo', JSON.stringify(savedList));

});

// Strike Through Item
todoList.addEventListener('click', function(e){
    let clickListItem = e.target;
    // const buttonId = clickListItem.getElementByTagName('button')[0].getAttribute('id');

    if (!clickListItem.isCompleted){
        clickListItem.style.textDecoration = 'line-through';
        clickListItem.isCompleted = true;
    } else {
        clickListItem.style.textDecoration = 'none';
        clickListItem.isCompleted = false;
    }
    for (let i = 0; i < savedList.length; i++) {
        if (savedList[i].item === buttonId) {
            savedList[i].isCompleted = !savedList[i].isCompleted;
            localStorage.setItem('todo', JSON.stringify(savedList));
            break;
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

function removeFunc(taskId){
    splicedList = savedList.filter(l => l.id != taskId)
    localStorage.setItem('todo', JSON.stringify(splicedList));
    }
