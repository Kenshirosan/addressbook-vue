export default function postRequest(e) {
    e.preventDefault();

    document.getElementById('postResponse').innerHTML = 'Loading...';

    let xhttp = new XMLHttpRequest();

    const formData = new FormData(this);

    xhttp.open('POST', 'server/postjson.php');

    xhttp.send(formData);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(xhttp.response);

            document.getElementById(
                'postResponse'
            ).innerHTML = `<p>${response.results.status}</p>`;
        }
    };
}
