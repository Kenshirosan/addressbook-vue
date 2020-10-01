import CustomErrorsConstructor from './modules/CustomErrorsConstructor.js';

const errorMessage = {
    error: 'Form Error',
    message: 'Same player play again',
};

const customError = new CustomErrorsConstructor(
    errorMessage.message,
    errorMessage.error
);

console.log(customError.name);
console.log(customError.message);
console.log('\u{1f609}');
console.log(typeof customError);
console.log(customError instanceof Error);
console.log(customError);
