# AJAX

JavaScript peut envoyer des requêtes http vers un serveur pour obtenir des informations.
AJAX signifie Asynchronous JavaScript And XML, XML est juste là pour des raisons historique, le format de transfert de données qui s'est imposé est le JSON, on n'est pas obligé d'utilisé le XML. 

## jQuery ajax
Nous allons maintenant vous présenter les mêmes requêtes, effectuées avec la librairie jQuery, qui a été très utilisé pendant plus de qunize ans, qui est de moins en moins utilisé car le JavaScript a énormément évolué, mais qui n'est pas prête de disparaître du web.

Voici une requête GET :
```javascript
function jqueryGetRequest(e) {
    e.preventDefault();
    $('#getResponse').html(`<p>Loading Informations</p>`);
    
    // méthode jQuery qui formate les données d'un formulaire
    const data = $(this).serialize();

    $.get(`server/getjson.php?${data}`, function (res) {
        $('#getResponse').html(
            `<p>${res.results.status}</p><p>${res.results.prenom}</p>`
        );
    });
}
```
Rien de particulier sur cette requête, jQuery permet de tout faire avec un minimum de ligne de code.

une requête POST :
```javascript
function jqueryPostRequest(e) {
    e.preventDefault();
    $('#getResponse').html(`<p>Loading Informations</p>`);
    
    // autre méthode jQuery qui formate les données d'un formulaire
    const data = $(this).serializeArray();

    $.post('server/postjson.php', data, function (res) {
        $('#postResponse').html(
            `<p>${res.results.status}</p><p>${res.results.contact.nom}</p><p>${res.results.contact.prenom}</p>`
        );
    });
}

```
Comme d'habitude, rien de très compliqué avec jQuery, un minimum de lignes de code et tout fonctionne
