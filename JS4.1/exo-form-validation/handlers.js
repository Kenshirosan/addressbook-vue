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

export { createError };
