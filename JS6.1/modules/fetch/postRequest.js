export default function postRequest(e) {
    e.preventDefault();

    document.getElementById('postResponse').innerHTML = 'Loading...';

    let formData = new FormData(this);

    let req = new Request('server/postjson.php', {
        method: 'POST',
        body: formData,
        mode: 'cors',
    });

    fetch(req)
        .then(res => res.json())
        .then(data => {
            document.getElementById('postResponse').innerHTML = `
            <p>status:${data.results.status}:</p> <p>nom:${data.results.contact.nom},</p><p>prenom: ${data.results.contact.prenom}</p>`;
        })
        .catch(err => console.error(err));
}
