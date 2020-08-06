export default function jqueryGetRequest(e) {
  e.preventDefault();
  $("#getResponse").html(`<p>Loading Informations</p>`);

  const data = $(this).serialize();

  $.get(`server/getjson.php?${data}`, function (res) {
    $("#getResponse").html(
      `<p>${res.results.status}</p><p>${res.results.prenom}</p>`
    );
  });
}
