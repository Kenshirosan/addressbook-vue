console.log(window);
console.log(window.history);
console.log(window.innerWidth);
console.log(window.innerHeight);

document.body.style.background = 'grey';
console.log(document);
let element = document.getElementById('app');
console.log(element);
element.style.backgroundColor = 'lightgrey';
element.style.padding = '1em';

element = document.querySelector('p'); // Sélectionne tous les <p> sur la page
console.log(element);
element = document.querySelector('li:nth-child(2)');
console.log(element.innerText);

element = document.querySelector('ul'); // document Sélectionne la <ul>
let li = element.querySelector('li:first-child'); // <ul> sélectionne première <li>
console.log(li);

let elements = document.querySelectorAll('li');
console.log(elements);
elements = document.querySelectorAll(':hover'); // pseudo-sélecteurs.
console.log(elements);

let a = document.querySelector('ul > li:first-child a');
a.classList.add('yellow');
a.classList.remove('test');

a.classList.toggle('active');

document.addEventListener('DOMContentLoaded', function (event) {
    console.log('ready');
    console.log(event);
});

function domReady(event) {
    console.log('domReady');
    console.log(event);
}

document.addEventListener('DOMContentLoaded', domReady);

document.addEventListener('keydown', function (event) {
    console.log(event);
    if (event.code === 'Space') {
        event.preventDefault();
        console.log('On change la photo du slider');
    }
});

document.addEventListener('click', function (event) {
    //On empêche le comportement par défaut de l'élément :
    event.preventDefault();
    // On log l'élément qu'on a cliqué :
    console.log('Click', event.target);
});

document.addEventListener('dblclick', function (event) {
    //On empêche le comportement par défaut de l'élément :
    event.preventDefault();
    // On log l'élément qu'on a cliqué :
    console.log('Double click', event.target);
});

document.addEventListener('mousemove', selectElementOnHover);
function selectElementOnHover() {
    let elems = this.querySelectorAll('ul li > a:hover');
    if (elems.length > 0) {
        console.log(elems);
    }
}
