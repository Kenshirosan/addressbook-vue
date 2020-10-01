# Document Object Model (DOM)

Jusqu'à maintenant, la découverte de JavaScript n'a pas été très utile pour nous permettre d'agir sur les pages web.
L'intérêt du JavaScript étant de transformer des pages HTML statique en application web dynamique, nous allons voir différentes manières d'interagir avec le DOM, plus spécifiquement différentes méthodes permettant de sélectionner des éléments HTML pour pouvoir par la suite les modifier, les animer, ou autre.

Avant de voir ces méthodes, quelques explications sont nécessaires à propos de l'objet `window` et de sa propriété `document`.
### Window:
```javascript
console.log(window);
```
L'objet `window` est l'objet global qui représente un onglet du navigateur. Tout le code JavaScript qui est éxécuté sur une page partage cette objet global.
L'objet global est l'endroit ou l'objet Math est défini, ainsi que les différentes classes et fonctions JavaScript native. 
De plus on peut avoir accès des informations de l'historique `window.history` de l'onglet, ainsi que différentes informations comme la largeur `window.innerWidth` ou la hauteur `window.innerHeight` de l'onglet.

### Document:
Le `document` est une propriété de l'objet `window`, il représente le HTML et on s'en sert pour modifier
ou créer toutes choses.

Il est impossible de lister toutes les méthodes et propriétés du `document` ici, voici un lien vers les
[spécifications](https://dom.spec.whatwg.org)

Voici un exemple de HTML, nous allons explorer différentes méthodes JavaScript pour sélectionner et agir sur ces éléments.

```html
<div id="app">
    <div class="container">
        <section>
            <article>
                <h2>Titre de l'article</h2>
                <p>1er paragraphe</p>
                <p>2ème paragraphe</p>
                <p id="test">3ème paragraphe</p>
                <a href="#!">lien</a>
                <ul>
                    <li class="test"><a href="#!">1ère li</a></li>
                    <li><a href="#!">2ème li</a></li>
                    <li><a href="#!">3ème li</a></li>
                </ul>
            </article>
        </section>
    </div>
</div>
```
### Méthodes de sélection de base :
#### `getElementById()`

```javascript
let element = document.getElementById('app');
console.log(element);
```

Cette méthode permet de sélectionner un élément par son ID, et elle retourne un élément HTML.
On peut ensuite agir dessus, pour modifier le CSS par exemple :
```javascript
element.style.backgroundColor = 'lightgrey';
element.style.padding = '1em';
```

**Rappel: une ID doit être unique.**
Si par erreur plusieurs éléments ont la même ID, le comportement de cette méthode devient erratique et 
peut sélectionner n'importe quel élément.

#### `querySelector()`
La méthode `querySelector` permet de sélectionner un élément, 
mais est beaucoup moins rigide que la précédente. Elle accepte tout type de sélecteurs CSS.
```javascript
element = document.querySelector('p'); // Sélectionne tous les <p> sur la page
console.log(element);
element = document.querySelector('li:nth-child(2)'); // Sélectionne la 2ème <li>
console.log(element.innerText);
element = document.querySelector('ul');
let li = element.querySelector('li:first-child');
console.log(li);
```

On peut aussi se servir d'un élément pour en sélectionner un autre.
```javascript
element = document.querySelector('ul'); // document Sélectionne la <ul>
let li = element.querySelector('li:first-child'); // <ul> sélectionne première <li>
console.log(li);
```

#### `querySelectorAll()`
Cette méthode permet de sélectionner une groupe d'éléments appelés `NodeList`.
On peut sélectionner tous les éléments, elle accepte tous types de sélecteurs CSS, et également les pseudo-sélecteurs.

```javascript
let elements = document.querySelectorAll('li');
console.log(elements);
elements = document.querySelectorAll(':hover'); // pseudo-sélecteurs.
console.log(elements);
```
Sélectionner les éléments avec un pseudo-sélecteur ne vous sera utile que lorsque on gérera les `events`.

#### `classList`
La propriété `classList` est utilisé pour ajouter ou enlever des classes CSS aux éléments sélectionnés.
```javascript
let a = document.querySelector('ul > li:first-child a');
a.classList.add('yellow');
a.classList.remove('test');
```
Ici, on a ajouté simplement la classe yellow et on a enlevé la classe test.

La méthode toggle est souvent utilisé pour cacher ou afficher un élément.
Cette méthode ajoute une classe si l'élément sélectionné ne possède pas cette classe,
elle enlève la classe si l'élément la possède.
On peut imaginer cliquer un bouton et quand on le clique, on affiche ou cache un élément.
```css
/*CSS*/
.active {
    display: block;
}
```
```javascript
// JS
a.classList.toggle('active');
```


### `events`
les `events` sont des évènements qui se produisent quand on navigue sur une page, 
quand la souris bouge, quand on clique un élément ou quand on tape sur le clavier par exemple.
Il existe plusieurs types d'évènements, les natifs et ceux qu'on crée.
Pour l'instant, on va voir les events les plus courantes, 
qui se produisent quand la page web a finie de se charger, 
quand on tape sur le clavier et quand on agit avec la souris.

On ajoute ce qu'on appelle des `events listener` avec une méthode qui accepte deux arguments,
le premier argument est l'évènement qu'on souhaite écouter, le second est une fonction dite 'callback'
qui sera exécuté quand l'évènement se produira.
La fonction de callback peut accepter optionnellement l'évènement.
Ajoutons l'évènement suivant :
##### `DOMContentLoaded`
Cet évènement se produit quand la page web est chargée et indique que 
tous les éléments sont 'prêts' et qu'on peut agir sur la page avec le code javascript.
```javascript
document.addEventListener('DOMContentLoaded', function(event) {
    console.log('ready');
    console.log(event);
});
```
Voici une autre façon d'écrire un `eventListener`, on crée une fonction séparée et on la passe par référence en callback :
```javascript
function domReady(event) {
    console.log('domReady');
    console.log(event);
}

document.addEventListener('DOMContentLoaded', domReady);
```
Il est judicieux d'exécuter le JavaScript après qu'on ai reçu cet évènement.

##### `Keyboard Events`
Les évènements du clavier peuvent être utilisés pour faire défiler les images d'une galerie photo par exemple.
Différentes `event` sont disponibles : `keydown`, `keyup`.
Quand on `console.log()` l'évènement, on se rend compte qu'on a différentes propriétés qu'on peut utiliser pour identifier la touche du clavier,
Ensuite on peut prévenir son fonctionnement par défaut et faire ce qu'on veut avec :
```javascript
document.addEventListener('keydown', function(event) {
    console.log(event);
    if(event.code === 'Space') {
        event.preventDefault(); // Empêcher le déroulement de la page
        console.log('On change la photo du slider');
    }
});
```
##### `Mouse Events`
Il y a également plusieurs types d'évènements concernant 
la souris : le clique, le double clique, les mouvements etc etc..
Voyons en quelques un :
```javascript
// clique gauche simple
document.addEventListener('click', function(event) {
    //On empêche le comportement par défaut de l'élément :
    //Si l'élément est un lien, il dirigera pas la ou le href indique : il ne fera rien. 
    event.preventDefault();
    // On log l'élément qu'on a cliqué :
    console.log(event.target);
});
// double clique :
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    
    console.log(event);
});
// mouvement de la souris
document.addEventListener('mousemove', selectElementOnHover);
// On sélectionne les <a> quand on passe la souris dessus
function selectElementOnHover() {
    let elems = this.querySelectorAll('ul li > a:hover');
    if (elems.length > 0) {
        console.log(elems);
    }
}
```
Voici quelques évènements souris disponible :
`mousedown, mouseup, mouseover, mouseout, click, dblclick, contextmenu`

#### `removeEventListener`
Enfin, si on peut ajouter un `eventListener`, on peut aussi l'enlever :
```javascript
document.removeEventListener('mousemove');
```
Si on a passé une fonction de callback par référence à un élément, il est **nécessaire** de l'enlever de la même manière :
```javascript
document.removeEventListener('mousemove', selectElementOnHover);
``` 
