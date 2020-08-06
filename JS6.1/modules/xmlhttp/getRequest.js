export default function getRequest(e) {
    e.preventDefault();

    document.getElementById('getResponse').innerHTML = 'Loading...';

    let prenom = document.querySelector('#prenom').value;
    let nom = document.querySelector('#nom').value;

    const data = {
        nom: nom,
        prenom: prenom,
    };

    const form = document.querySelector('form');

    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'server/getjson.php?nom=' + data.prenom, true);
    xhttp.send();

    xhttp.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.response);

            document.getElementById(
                'getResponse'
            ).innerHTML = `<p>Status: ${response.results.status}
                Query: ${response.results.prenom}</p>`;
        }
    };

    xhttp.onerror = function () {
        // se déclenche quand la requête n'a pas pu se faire.
        console.log('error');
    };

    xhttp.onprogress = function (event) {
        // on peut traquer combien de bytes on a reçu en réponse.
        console.log(event.loaded);
    };
}
