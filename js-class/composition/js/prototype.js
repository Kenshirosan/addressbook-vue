function CustomErrors() {
    this.name = '';
    this.message = '';
}

CustomErrors.prototype.recordErrors = function(error) {
    this.name = error.name;
    this.message = error.message;
};

CustomErrors.prototype.getErrors = function() {
    return {
        name: this.name,
        message: this.message,
    };
};

function Form(errors) {
    this.errors = errors;
}

Form.prototype.validate = function(inputs) {
    for (var field of inputs) {
        if (field.value === '') {
            this.errors.name = 'Invalid Form';
            this.errors.message = 'input ' + field.type + ' est invalide';

            return this.errors;
        }
    }

    return true;
};

Form.prototype.getErrors = function() {
    return this.errors.getErrors();
};

var error = new CustomErrors();
var form = new Form(error);

var fields = [];
var input = document.createElement('input');
var input2 = document.createElement('input');
input.name = 'name';
input.type = 'text';
input.value = 'John Doe';
input2.name = 'email';
input2.type = 'email';
input2.value = '';
fields.push(input);
fields.push(input2);

form.validate(fields);

const results = form.getErrors();

console.log(results);

//Exercice: Faire un classe avec des personnages et des attaques avec des armes differentes.
class Character {}

class Weapons {}

class Wizard extends Character {}

class Dragon extends Character {}

class Knight extends Character {}
// The language is irrelevant when dealing with composition vs inheritance. If you understand what class is and what an instance of a class is, then you have all you need.
//
