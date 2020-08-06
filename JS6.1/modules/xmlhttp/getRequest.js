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

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(xhttp.response);

            document.getElementById(
                'getResponse'
            ).innerHTML = `<p>Status: ${response.results.status}
                Query: ${response.results.prenom}</p>`;
        }
    };
}
