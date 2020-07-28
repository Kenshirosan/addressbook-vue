# Les classes en JavaScript

### La syntaxe:

```js
class CustomErrors {}
```

### A quoi sert une classe ?

Une classe permet de grouper au même endroit des morceaux de codes qui gèrent le même type de problèmes.

Une classe **_ne doit faire qu'une seule chose, elle n'a qu'une responsabilité_**, ici on prendra comme exemple la gestion d'erreur.

Dans notre domaine, nous devons en permanence gérer la validité des formulaires

Pour cela, nous pouvons créer une classe qui ne gèrera que les erreurs et ajouter toutes les fonctions qui gèrent les erreurs dans cette classe.

Quand on ajoute un fonction dans une classe, on ne l'appelle plus fonction mais **_méthode_**.

Voici la syntaxe pour ajouter une **_méthode_**dans une classe.

```js
class CustomErrors {
    recordErrors() {
        //
    }
}
```

Tout comme pour une fonction 'normale', notre **_méthode_**peut accepter des arguments, et faire un travail avec.

```
class CustomErrors {
    recordErrors(errors) {
        this.errors = errors;
    }
}
```

Pour comprendre ce morceau de code, quelques explications sont nécessaires:

### Le mot-clé:

    this

Le mot-clé: **_this_** représente simplement l'objet ou instance issue de la classe.

Ainsi

    this.errors

signifie qu'on veut accéder à une variable **_errors_** de notre classe, qu'on appelle une variable membre. Grâce à ce mot-clé, on peut aussi appeler les méthodes de la classe.

Pour l'instant la classe ne sait pas qu'elle a une variable **_errors_**. Pour la déclarer, il nous faut un constructeur:

```js
class CustomErrors {
    constructor() {
        this.errors = {};
    }

    recordErrors(errors) {
        this.errors = errors;
    }
}
```

Un constructeur **_constructor()_** est une méthode qui est appelé automatiquement quand on crée un objet issue d'une classe.

Quand on crée un objet à partir d'une classe, on parle d'instanciation. Dans cet exemple, on initialise la variable errors **_avec pour valeur un objet vide_**.

Pour instancier une classe, voici la syntaxe:

```js
const errors = new CustomErrors();
```

On a maintenant une instance de la classe CustomErrors et on peut accéder à ses méthodes.

```js
const errors = new CustomErrors();
//On a instancie la classe CustomErrors, on sait que sa propriété errors est un objet vide.
//On sait que la méthode recordError accepte un argument et que cette argument est un objet.
const errors = {
    error: 'invalidField',
    message: `Le champ ${input.name} n'est pas valide`,
};
errors.recordErrors(error);
```

On a donc enregistré une erreur. Maintenant, on doit pouvoir y accéder. Il suffit de rajouter un méthode qui nous le permet:

```js
class CustomErrors {
    constructor() {
        this.errors = {};
    }

    recordErrors(errors) {
        this.errors = errors;
    }

    getErrors() {
        console.log(this.errors);
    }
}
```

Pour accéder aux données, il ne reste qu'appeler la méthode `getErrors()`:

```js
const errors = new CustomErrors();
// On a instancié la classe, on sait que sa propriété errors est un objet vide.
// On sait que la méthode recordError accepte un argument. Ce sera un objet.
const errors = { error: 'unknown', message: 'same player play again' };
error.recordErrors(error);

errors.getErrors();
```

Vous pouvez maintenant appuyer sur `f12` et voir le résultat.

On a créer la classe CustomErrors dans le fichier correspondant Error.js, c'est une convention de nommer le fichier et la classe exactement de la même manière, on s'y retrouve beaucoup plus facilement.

**L'organisation du code est aussi importante que le code lui même, on doit tout faire pour qu'il soit le plus lisible et le mieux organisé possible.**

Dans cet exemple, on a la classe CustomErrors et après la déclaration de celle-ci, on l'exporte ainsi:

```js
class CustomErrors {
    constructor() {
        this.errors = {};
    }

    recordErrors(errors) {
        this.errors = errors;
    }

    getErrors() {
        console.log(this.errors);
    }
}

export default CustomErrors;
```

`export default CustomErrors` nous permet d'exporter ce qu'on appelle un module.

Naturellement, si on exporte un fichier, on va l'importer ailleurs.

`import CustomErrors from './modules/CustomErrors.js';`

Dans le fichier class.js, on importe la classe et on s'en sert dans la fonction `validateFormInput()` ainsi que dans le test en dessous.

```js
import CustomErrors from './modules/CustomErrors.js';

//Instanciation
const errors = new CustomErrors();

function validateFormInput(input) {
    if (!input.value) {
        return errors.recordErrors({
            // la méthode de la classe CustomErrors
            error: 'unknown',
            message: 'Same player play again',
        });
    }

    return input.value;
}

if (!validateFormInput(`un input invalide`)) {
    errors.getErrors(); // l'autre méthode.
}
```

Pour rendre possible l'import / export de modules, on doit le spécifier dans la balise script du fichier html.

```js
<script type="module" src="class.js"></script>
```

Attention: il est facile d'oublier cet attribut: `type="module"`

Lisez le code et **_n'hésitez pas à poser des questions_** à votre formateur.

Il existe plusieurs facons d'exporter / importer des modules, nous verrons ces cas en [cliquant ici](modules.html)

[3WAcademy](https://3wa.fr)
