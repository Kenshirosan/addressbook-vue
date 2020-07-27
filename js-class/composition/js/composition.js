import CustomErrors from './modules/CustomErrors.js';
import Form from './modules/Form.js';

const error = new CustomErrors();
const form = new Form(error);

const fields = [];
const input = document.createElement('input');
const input2 = document.createElement('input');
input.name = 'name';
input.value = '';
input2.name = 'email';
input2.value = 'john@doe.com';
fields.push(input);
fields.push(input2);

const results = form.validate(fields);
console.log(results);
