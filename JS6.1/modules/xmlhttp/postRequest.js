export default function postRequest(e) {
    e.preventDefault();

    document.getElementById('postResponse').innerHTML = 'Loading...';

    let xhttp = new XMLHttpRequest();

    const formData = new FormData(this);

    xhttp.open('POST', 'server/postjson.php');
    xhttp.responseType = 'json';
    xhttp.send(formData);

    xhttp.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = xhttp.response;

            document.getElementById(
                'postResponse'
            ).innerHTML = `<p>${response.results.status}</p>`;
        }
    };
}
