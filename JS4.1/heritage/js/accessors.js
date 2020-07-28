import CustomErrors from './modules/CustomErrors.js';

const errorMessage = {
    error: 'unknown',
    message: 'Same player play again',
};
const customError = new CustomErrors();

customError.message = errorMessage;

console.log('\u{1f600}');
console.log(customError);
