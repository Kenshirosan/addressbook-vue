class Form {
    constructor(error) {
        this.error = error;
    }

    validate(fields) {
        for (let field of fields) {
            if (!field.value) {
                // Gestion des erreurs avec notre class Error
                this.error.name = 'Form invalide';
                this.error.message = `Le champ ${field.name} est invalide.`;
                return false;
            }
        }

        return true;
    }
    // Recuperation des erreurs en deleguant a la classe erreur
    getErrors() {
        return this.error.getErrors();
    }
}

export default Form;
