class CustomErrorsConstructor extends Error {
    constructor(message, name) {
        super(`${message} ${name}`);
        this.message = message;
        this.name = name;
    }
}

export default CustomErrorsConstructor;
