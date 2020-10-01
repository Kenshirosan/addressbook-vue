# Les classes en JavaScript: les prototypes


## Les prototypes

La chance qu'ont les personnes qui apprennent JavaScript maintenant est qu'ils ont à disposition une syntaxe spécifique et qui ressemble à celle d'autres langages pour faire des classes.

Pou terminer avec cette introduction aux classes, nous allons implémenter le même système d'erreur, mais en utilisant les prototypes, qui représentent la manière dont l'héritage fonctionne dans ce langage. On rencontre encore souvent ce type de code dans les applications que l'on doit maintenir, et on ne le voit pas mais les classes fonctionnent aussi toujours de cette façon. Les classes sont du 'sucre syntaxique' autour des prototypes. Il est donc impératif de bien comprendre comment tout cela fonctionne.

Presque tous les objets JavaScript ont un second objet associés, c'est le prototype `Object.prototype`. Cet objet est un des rares objets JavaScript qui ne possède pas de prototype. Il n'hérite d'aucune propriétés.

L'objet que l'on crée hérite des propriétés de ce prototype. (techniquement, son prototype hérite 🤯)

Si on crée une date avec `new Date()`, la date hérite des propriétés de Date.prototype, et également d'Object.prototype. Cette série de prototypes liés s'appelle **_chaîne de prototypes ou prototype chain_**

## Le fonctionnement de la chaîne de prototype:

Quand on appelle une méthode sur un objet, par exemple `date.toString()` JavaScript va commencer par regarder si `date` possède une méthode `toString()` et s'il ne la trouve pas, il va regarder plus haut dans la chaîne pour voir s'il la trouve.

Accédons aux propriétés de l'objet, pour ça on a la méthode `.hasOwnProperty`, créons un objet `Date` et regardons ce qu'il se passe.
```javascript
let date = new Date();
console.dir(date);
console.log(Date.prototype.hasOwnProperty('toString')); // true propriété native.
console.log(date.hasOwnProperty('toString')); // false
console.log(date.toString()); // ne possède pas de propriété toString mais on peut s'en servir puisqu'on l'hérite du constructeur Date 
```
`f12`

On voit ici clairement la chaîne en action.

On peut modifier le prototype de nos objets et ainsi changer leur comportement.

Il est possible de modifier le prototype des objets natifs, mais fortement déconseillé, c'est en effet une source de bugs sans fin.

Procédons exactement comme avec les classes et implémentons la fonction et les méthodes permettant d'enregistrer et de lire les erreurs mais avec une autre syntaxe:
```javascript
function CustomErrors() { // ligne 1 fichier prototype.js
    this.name = '';
    this.message = '';
}

CustomErrors.prototype.recordErrors = function (error) {
     this.name = error.name;
     this.message = error.message;
};

CustomErrors.prototype.getErrors = function () {
    return {
        name: this.name,
        message: this.message,
    };
};
```

On se sert du mot-clé `function` pour déclarer notre classe, et pour l'instancier, toujours le mot-clé new

Toutes les fonctions JS ont un prototype, sauf les fonctions flèches.

Dans le code qui suit, on commence par vérifier quel objet est une instance de quel autre objet, puis on vérifie quelles sont les propriétés natives de notre objet, et lesquelles sont héritées.

Les propriétés true sont natives, on les crée avec notre objet.

Les propriétés false sont héritées.

**_Attention à la nuance, la fonction CustomErrors est un objet, car une fonction en JS est un objet, l'instance error issue de CustomErrors est aussi un objet._**

```javascript
const error = new CustomErrors(); // ligne 44 fichier prototype.js
console.log(error); // notre objet

console.log(typeof error); // object
console.log(error instanceof Object); // true
console.log(error.prototype instanceof Object); // false
console.log(Object.prototype);
console.log(CustomErrors);
console.log(CustomErrors instanceof Object); // true
console.log(CustomErrors.prototype instanceof Object); // true

// Vérification des propriétés, celle qui sont true appartiennent à notre objet;
// les false mais dont on voit bien que l'on peut s'en servir sont héritées d'Object.prototype.

console.log(CustomErrors.prototype.hasOwnProperty('hasOwnProperty')); // false
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true
console.log(CustomErrors.prototype.hasOwnProperty('message')); // false
console.log(CustomErrors.prototype.hasOwnProperty('getErrors')); // true
console.log(error.hasOwnProperty('hasOwnProperty')); // false
console.log(error.hasOwnProperty('message')); // true
console.log(error.hasOwnProperty('getErrors')); // false

// ici avec la classe native Date
console.log(Date.prototype.hasOwnProperty('getDay')); // true
console.log(Date.prototype.hasOwnProperty('hasOwnProperty')); // false
console.log(Date.prototype instanceof Object); // true
console.log(Object.hasOwnProperty('hasOwnProperty')); // false
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true
```

`f12`

En JavaScript, une classe est un jeu d'objets qui héritent du même objet prototype, **_cet objet prototype est donc une caractéristique essentielle des classes_**

Il est évident que tout ceci prête à confusion. Avec le temps tout s'éclaicira.

* * *

### Implémentation de Form et fin du code de gestion d'erreur version prototype:

```javascript
function Form(errors) {
    this.errors = errors;
}

Form.prototype.validate = function (inputs) {
    // Le mot-clé var est un clin d'oeil aux anciens..
     for (var field of inputs) {
         if (field.value === '') {
              this.errors.name = 'Invalid Form';
              this.errors.message = 'input ' + field.type + ' est invalide';

              return false;
         }
     }

     return true;
};

Form.prototype.getErrors = function () {
    // on récupère les erreur en déléguant a l'objet (this.)errors
    return this.errors.getErrors();
};
```

On fait tourner tout ce beau monde:

```javascript
const form = new Form(error);

const fields = [];
const input = document.createElement('input');
const input2 = document.createElement('input');
input.name = 'name';
input.type = 'text';
input.value = 'John Doe';
input2.name = 'email';
input2.type = 'email';
input2.value = '';
fields.push(input);
fields.push(input2);

if (!form.validate(fields)) {
    console.error(form.getErrors());
}
```

Comme d'habitude on `f12`et on admire l'erreur tout en bas de la console.

C'est tout pour les prototypes, le temps et la pratique rendront 
ce sujet moins confus et même très clair

Voici un article à propos de la programmation avec prototypes. [wikipedia](https://en.wikipedia.org/wiki/Prototype-based_programming)
