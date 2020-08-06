import Form from './Form.js';

const form = new Form();
const contacts = JSON.parse(localStorage.getItem('valid-contact')) || [];
document.querySelector('form').addEventListener('submit', validateForm);
const inputs = document.querySelectorAll('input');
inputs.forEach.call(inputs, input => {
    input.addEventListener('keydown', form.removeError);
});

function validateForm(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input');

    if (form.validate(inputs)) {
        const contact = form.contact;
        contacts.push(contact);
        form.post(contacts);
        // document.querySelector('form').reset();
    } else {
        form.createError();
    }
}
