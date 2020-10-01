function showError(error) {
    const div = document.createElement('div');
    div.classList.add('error');
    div.innerHTML = `<p>${error.message}</p>`;
    document.querySelector('.container').appendChild(div);
    setTimeout(() => {
        document.querySelector('.error').remove();
    }, 5000);
}

export default showError;
