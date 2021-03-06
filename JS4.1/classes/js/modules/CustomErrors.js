class CustomErrors extends Error {
    constructor() {
        super();
    }

    // on récupère la propriété de la classe parente et on lui assigne une valeur
    set message(errors) {
        super.message = errors;
    }

    // on récupère la propriété de la classe parente
    get message() {
        return super.message;
    }

    recordErrors(errors) {
        this.message = errors;
    }

    getErrors() {
        return this.message;
    }
}

export default CustomErrors;
