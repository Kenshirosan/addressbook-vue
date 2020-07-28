# Les classes en JavaScript: héritage par le constructeur

Pour faire la même chose que précédemment, il est possible de passer directement par le constructeur.

```js
class CustomErrorsConstructor extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

export default CustomErrorsConstructor;
```

```js
import CustomErrorsConstructor from './modules/CustomErrorsConstructor.js';
// Une erreur s'est produite
const errorMessage = {
    error: 'unknown',
    message: 'Same player play again',
};

// On passe l'erreur directement au niveau de constructeur,
// La class parente sera instancié avec le message directement.
const customError = new CustomErrors(errorMessage);

// On accede directement a la propriete message.
console.log(customError.message);
```

On se souvient qu'il y également un propriété name a la class native Error: ![image d'illustration](img/error.png) Modifions notre code:

```js
class CustomErrorsConstructor extends Error {
    constructor(message, name) {
        // attention le constructeur de la classe Error n'accepte qu'un argument
        super(`${message} ${name}`);
        this.message = message;
        this.name = name;
    }
}

export default CustomErrorsConstructor;
```

Jusqu'a maintenant , on lisait un message très vague et flou dans la console, avec cette modification on peut lire le nom de l'erreur et la valeur du message quand on console.log l'instance de l'erreur.

```js
import CustomErrorsConstructor from './modules/CustomErrorsConstructor.js';
// Une erreur s'est produite
const errorMessage = {
    error: 'unknown',
    message: 'Same player play again',
};

// On passe l'erreur directement au niveau de constructeur,
// La class parente sera instancié avec le message directement.
const customError = new CustomErrorsConstructor(
    errorMessage.message,
    errorMessage.error
);

console.log(customError.name); // Form Error
console.log(customError.message); // Same player play again
console.log('\u{1f609}'); // un emoji pour se détendre
console.log(typeof customError); // object
console.log(customError instanceof Error); // true
// L'instance de notre classe:
console.log(customError); // Form Error: Same player play again
```

`f12`

[Retour](../)

[3WAcademy](https://3wa.fr)
