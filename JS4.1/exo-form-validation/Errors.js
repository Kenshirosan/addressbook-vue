class Errors {
    constructor() {
        this.errors = {
            messages: [],
        };
    }

    record(error) {
        this.errors.messages.push(error);
    }

    createError() {
        for (let error of this.errors.messages) {
            for (let field in error) {
                if (error.hasOwnProperty(field)) {
                    const span = document.createElement('span');
                    span.innerText = error[field];
                    span.classList.add('form-error');
                    const input = document.querySelector(
                        `input[name="${field}"]`
                    );
                    if (
                        !input.nextElementSibling.classList.contains(
                            'form-error'
                        )
                    ) {
                        input.parentNode.insertBefore(span, input.nextSibling);
                    }
                }
            }
        }
        this.errors.messages.length = 0;
    }
}

export default Errors;
