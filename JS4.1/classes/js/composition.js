import CustomErrors from '../../composition/js/modules/CustomErrors.js';
import Form from './modules/Form.js';

const error = new CustomErrors();
const form = new Form(error);

const fields = [];
const input = document.createElement('input');
const input2 = document.createElement('input');
input.name = 'name';
input.type = 'text';
input.value = '';
input2.name = 'email';
input2.type = 'email';
input2.value = 'john@doe.com';
fields.push(input);
fields.push(input2);

if (!form.validate(fields)) {
    console.log(form.getErrors());
    console.log(form instanceof CustomErrors);
    console.log(error);
    console.log(error instanceof CustomErrors);
    console.log(error instanceof Error);
}
