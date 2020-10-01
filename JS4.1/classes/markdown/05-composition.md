# Les classes en JavaScript

### Introduction:

Reprenons notre classe Error et créons une class Form qui représentera un formulaire.

```javascript
class Form {
    validate(fields) {
        for (let field of fields) {
            if (!field.value) {
                //Erreur
            }
        }
    }
}

export default Form;
```

Cette classe doit s'occuper de la validation des champs des formulaires. Elle a donc besoin de méthodes pour valider les erreurs.

Naturellement, on pense à la classe Error et on se dit qu'avec l'héritage, on pourrait faire fonctionner tout ça.


**_C'est une erreur radicale:_**

**_Si on étend la class Error avec la class Form, la classe Form sera une instance de Error_**

Autrement dit: la classe Form sera une erreur, alors que cette classe représente un formulaire_**

**_Si le formulaire est mal rempli, il y aura des erreurs, mais ce sera toujours un formulaire._**

**_le formulaire peut comporter des erreurs, mais il ne sera jamais une erreur._**


Alors, comment faire avec nos deux classes ?

### La composition:

On vient de voir de manière theorique que la classe Form a besoin de la class Error pour fonctionner, elle en est dépendante.

Passons à la pratique:

On a besoin d'une instance de la classe Form et d'une instance de la classe Error

```javascript
const error = new CustomErrors();
const form = new Form();

//Simule un formulaire.
const fields = [];
const input = document.createElement('input');
const input2 = document.createElement('input');
input.name = 'name';
input.value = '';
input2.name = 'email';
input2.value = 'john@doe.com'
fields.push(input);
fields.push(input2);

```

Essayons maintenant de faire fonctionner de code

```javascript
class Form {
    validate(fields) {
        for (let field of fields) {
            if (!field.value) {
                // Gestion des erreurs avec notre class Error
                error.name = 'Form invalide'
                error.message = `Le champ ${field.name} est invalide.`
            }
        }
    }
}
```

```javascript
const error = new CustomErrors();
const form = new Form();

//Simule un formulaire.
const fields = [];
const input = document.createElement('input');
const input2 = document.createElement('input');
input.name = 'name';
input.value = '';
input2.name = 'email';
input2.value = 'john@doe.com'
fields.push(input);
fields.push(input2);

// On envoie les données à notre classe Form
const results = form.validate(fields);
console.log(results);
```

Voici le resultat: ![image d'erreur](../img/formerror.png) La classe Form n'est pas au courant qu'elle peut comporter des erreurs. Remédions y:

```javascript
class Form {
    // On injecte une instance d'erreur dans le constructeur
    constructor(error) {
        this.error = error;
    }

    validate(fields) {
        for (let field of fields) {
            if (!field.value) {
                // Gestion des erreurs avec notre class Error
                 // La class a maintenant une propriete error, donc `this` 😉
                this.error.name = 'Form invalide'
                this.error.message = `Le champ ${field.name} est invalide.`
                return false;
            }
        }

        return true;
    }

    // Récupération des erreurs en déléguant à la classe erreur
    getErrors() {
        return this.error.getErrors();
    }
}
```

```javascript
const error = new CustomErrors();

// On passe error au formulaire ici
const form = new Form(error);

//...

if(!form.validate(fields)) {
    console.log(form.getErrors());
    console.log(form instanceof CustomErrors);
    console.log(error);
    console.log(error.getErrors());
    console.log(error instanceof Error);
    console.log(error instanceof CustomError);
}
```

`f12` Pour le résultat.

Parfois, l'héritage est adapté, souvent il ne l'est pas.

Savoir faire cette différence est essentielle.

Avant de commencer à coder des classes, de vous servir de l'héritage, posez vous un question simple:

Est-ce que mon objet 'est un(e)' ? Ou est-ce que mon objet 'a un(e)'?

Comme toujours, votre formateur se fera un plaisir de répondre a vos questions

Ces notions sont toujours un peu floues au début, mais avec la pratique, tout s'éclaircit et devient plus facile.

**Pour résumer, la composition, c'est simplement quand une classe est composée d'autres classes, ou quand un objet comporte une ou plusieurs références d'autres objets.**

**L'héritage, c'est quand une classe hérite de méthodes et propriétés d'une autre classe.**

Ici, on a donc une classe qui hérite, la classe CustomErrors, et une classe Form dépendante de la classe CustomError.
