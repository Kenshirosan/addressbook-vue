import CustomErrors from './modules/CustomErrors.js';

const errors = new CustomErrors();

function validateFormInput(input) {
    if (!input.value) {
        return errors.recordErrors({
            error: 'unknown',
            message: 'Same player play again',
        });
    }

    return input.value;
}

if (!validateFormInput(`un input vide`)) {
    console.log(errors.getErrors());
}
