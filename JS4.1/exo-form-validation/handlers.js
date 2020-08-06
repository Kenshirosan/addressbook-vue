const validator = {
    nameMinimmumLength: 4,

    validateName: function(key) {
        if (typeof key !== 'string' || key.length < nameMinimmumLength) {
            return state.errors.record(
                `Quelque chose d'horrible s'est produit`
            );
        }
    },
};

function createError() {
    if (!state.errors.get()) return;

    const div = document.createElement('div');
    div.setAttribute('id', 'error');
    const p = document.createElement('p');
    p.innerText = state.errors.get();
    div.appendChild(p);
    document.body.appendChild(div);

    clearError();
}

function clearError() {
    setTimeout(() => {
        document.querySelector('#error').remove();
    }, 3000);
}

export { validator, handler, createError };
