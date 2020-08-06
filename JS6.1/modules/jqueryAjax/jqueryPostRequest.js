export default function jqueryPostRequest(e) {
    e.preventDefault();
    $('#getResponse').html(`<p>Loading Informations</p>`);

    const data = $(this).serializeArray();

    $.post('server/postjson.php', data, function (res) {
        $('#postResponse').html(
            `<p>${res.results.status}</p><p>${res.results.contact.nom}</p><p>${res.results.contact.prenom}</p>`
        );
    });
}
