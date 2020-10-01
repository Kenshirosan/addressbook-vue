import { dateDiffInDays, deleteCardIf } from '../utilities/utilities.js';

function showUser(user) {
    deleteCardIf(document.querySelector('.card'));

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML += `
        <img src="${user.avatar_url}" alt="user profile picture">
        <h2>${user.login}</h2>
        <h3>${user.name}</h3>
        <p>Utilisateur créé le ${new Date(
            user.created_at
        ).toLocaleDateString()}, il y a ${dateDiffInDays(
        user.created_at
    )} jours</p>
        <p>Nombre de repos: ${user.public_repos}</p>
        <a class="button" href="${user.html_url}">Voir</a>`;

    document.querySelector('.result').append(card);
}

export default showUser;
