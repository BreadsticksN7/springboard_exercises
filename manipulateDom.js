// Select the section with an id of container without using querySelector.
const containerByID = document.getElementById('container');

// Select the section with an id of container using querySelector.
const containerByQ = document.querySelector('#container');

// Select all of the list items with a class of “second”.
const listSecond = document.querySelectorAll('.second');

// Select a list item with a class of third, but only the list item inside of the ol tag.
const ol = document.querySelector('ol');
const listThird = ol.querySelector('.third');

// Give the section with an id of container the text “Hello!”.
const section = document.querySelector('#container');
const newText = document.createElement('p');
newText.innerText = "Hello!";
section.prepend(newText);

// Add the class main to the div with a class of footer.
// Remove the class main on the div with a class of footer.
const footer = document.querySelector('.footer');
footer.classList.toggle('main');

// Create a new li element.
// Give the li the text “four”.
// Append the li to the ul element.
const ul = document.querySelector('ul');
const newLi = document.createElement('li')
newLi.innerText = 'fourth';
ul.append(newLi);

// Loop over all of the lis inside the ol tag and give them a background color of “green”.
const olList = document.querySelectorAll('ol li');
for (let i = 0; i < olList.length; i++){
    olList[i].style.backgroundColor = 'green';
}
// Remove the div with a class of footer
const div = document.querySelector('.footer');
div.remove();
