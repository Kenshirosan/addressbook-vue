export default async function getRequest(e) {
    e.preventDefault();
    document.getElementById('getResponse').innerHTML = 'Loading...';

    let prenom = document.querySelector('#prenom').value;
    let nom = document.querySelector('#nom').value;

    const contact = {
        prenom: prenom,
        nom: nom,
    };

    let url = new URL('http://localhost/JS6.1/server/getjson.php');

    url.searchParams.set('prenom', contact.prenom);
    url.searchParams.set('nom', contact.nom);

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById(
    //             'getResponse'
    //         ).innerHTML = `${data.results.prenom} ${data.results.status}`;
    //     })
    //     .catch(err => console.error(err));
    let response = await fetch(url);
    let data = await response.json();

    document.getElementById(
        'getResponse'
    ).innerHTML = `${data.results.prenom} ${data.results.status}`;
}
