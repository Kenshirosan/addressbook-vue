import Errors from './Errors.js';
import Age from './Age.js';

class Form {
    constructor() {
        this.error = new Errors();
        this.isValid = false;
        this.allowed = ['name', 'email', 'age'];
        this.age = new Age();
        this.email = '';
        this.name = '';
        this._contact = {
            name: '',
            email: '',
            age: '',
        };
    }

    post(data) {
        localStorage.setItem('valid-contact', JSON.stringify(data));
    }

    get contact() {
        return this._contact;
    }

    validate(fields) {
        for (let field of fields) {
            if (!this.allowed.includes(field.name)) {
                return this.error.record(
                    `Le champ ${field.name} n'est pas valide`
                );
            }

            if (field.name === 'email') {
                if (this.validateEmail(field.value)) {
                    this.isValid = true;
                    this._contact.email = field.value;
                } else {
                    this.error.record({ email: 'Email invalide' });
                }
            }

            if (field.name === 'age') {
                this.isValid = false;
                this.age.age = field.value;
                if (this.age.isValid) {
                    this.isValid = true;
                    this._contact.age = this.age.age;
                } else {
                    this.error.record({ age: 'Age invalide' });
                }
            }

            if (field.name === 'name') {
                if (!field.value || field.value.length < 4) {
                    this.error.record({ name: 'Nom invalide' });
                }
                this._contact.name = field.value;
            }
        }
        if (this.error.errors.messages.length > 0) {
            this.isValid = false;
        }

        return this.isValid;
    }

    createError() {
        return this.error.createError();
    }

    removeError() {
        if (this.nextElementSibling.classList.contains('form-error')) {
            this.nextElementSibling.remove();
        }
    }

    validateEmail(email) {
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

export default Form;
