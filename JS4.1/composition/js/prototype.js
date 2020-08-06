function CustomErrors() {
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

let date = new Date();
console.dir(date);
console.log(Date.prototype.hasOwnProperty('toString')); // true propriété native.
console.log(date.hasOwnProperty('toString')); // false : propriété héritée du constructeur Date.
console.log(date.toString()); // // ne possède pas de propriété toString mais on peut s'en servir puisqu'on l'hérite du constructeur Date

/**
 *
 *
 */
const error = new CustomErrors();
console.log(error); // notre objet

console.log(typeof error); // object
console.log(error instanceof Object); // true
console.log(error.prototype instanceof Object); // false
console.log(Object.prototype);
console.log(CustomErrors);
console.log(CustomErrors instanceof Object); // true
console.log(CustomErrors.prototype instanceof Object); // true

// Vérification des propriétés, celle qui sont true appartiennent à notre objet;
// les false mais dont on voit bien que l'on peut s'en servir puisq'on test .hasOwnProperty sont héritées d'Object.prototype.

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

/**
 *
 *
 */

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

//Exercice: Faire un classe avec des personnages et des attaques avec des armes differentes.
// Utilisez au moins un prototype
class Character {}

class Weapons {}

class Wizard extends Character {}

class Dragon extends Character {}

class Knight extends Character {}
