import CustomErrors from './modules/CustomErrors.js';

const errorMessage = {
    error: 'unknown',
    message: 'Same player play again',
};
const customError = new CustomErrors();

customError.recordErrors(errorMessage);

console.log(customError.getErrors());

console.log(customError);
