const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');
let todoItem = document.querySelector('#todoItem');

// Pull from storage
const savedList = JSON.parse(localStorage.getItem('todo')) || [];
for (let i = 0; i < savedList.length; i++) {
let newTodo = document.createElement('li');
newTodo.innerText = savedList[i].item;
const newButton = document.createElement('button');
// newButton.innerText = 'Remove';
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
    let newTodo = document.createElement('li');
    let newItem = document.querySelector('#todoItem').value;
    const newButton = document.createElement('button');
    // newButton.innerText = 'Remove';
    newTodo.innerText = newItem;
    newTodo.isCompleted = false;
    todoList.appendChild(newTodo);
    newTodo.appendChild(newButton);
    todoForm.reset();

// Save to storage 
    savedList.push({ item: newTodo.innerText, isCompleted: false });
    localStorage.setItem('todo', JSON.stringify(savedList));

});

// Strike Through Item
todoList.addEventListener('click', function(e){
    let clickListItem = e.target;

    if (!clickListItem.isCompleted){
        clickListItem.style.textDecoration = 'line-through';
        clickListItem.isCompleted = true;
    } else {
        clickListItem.style.textDecoration = 'none';
        clickListItem.isCompleted = false;
    }
    for (let i = 0; i < savedList.length; i++) {
        if (savedList[i].item === clickListItem.innerText) {
            savedList[i].isCompleted = !savedList[i].isCompleted;
            localStorage.setItem('todo', JSON.stringify(savedList));
        }
    }
});

// Remove from storage
todoList.addEventListener('click', function(e){
    let removeItem = e.target;
    if (e.target.tagName === 'BUTTON'){
        e.target.parentNode.remove();
        localStorage.removeItem('todo');
    }

});
