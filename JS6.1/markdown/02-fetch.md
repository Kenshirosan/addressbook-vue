# AJAX

JavaScript peut envoyer des requêtes http vers un serveur pour obtenir des informations.
AJAX signifie Asynchronous JavaScript And XML, XML est juste là pour des raisons historique, le format de transfert de données qui s'est imposé est le JSON, on n'est pas obligé d'utilisé le XML. 

## fetch
Voici la syntaxe :
```javascript
fetch(url)
```
Et c'est tout, ou presque.
La particularité de fetch est de retourner une promesse, nous verrons plus tard les explications sur les promesses, pour l'instant retenez juste qu'il y a deux façons principales de gérer ce type réponse.

La première pour une requête GET:
```javascript
// 0n construit une url avec le constructeur URL.
let url = new URL('http://localhost/JS6.1/server/getjson.php');

// On y ajoute des paramètres
url.searchParams.set('prenom', contact.prenom);
url.searchParams.set('nom', contact.nom);
// url est maintenant http://localhost/JS6.1/server/getjson.php?prenom=test&nom=test
```

On est maintenant prêt à envoyer la requête :
```javascript
fetch(url)
```

Ensuite pour gérer la réponse, il faut enchaîner les méthodes `.then()`
```javascript
fetch(url)
    .then(response => response.json())
```
**rappel sur les fonctions flèches sur une ligne: return est implicite.**  
Ici on a récupérer une string `response`, et on la parse directement, il existe d'autres méthodes telle que `response.text()`, Vous avez la documentation pour les autres.
Ensuite on doit faire quelque chose avec cet objet
```javascript
fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById(
            'getResponse'
        ).innerHTML = `${data.results.prenom} ${data.results.status}`;
    })
```
On a reçu les données, dans le deuxième `.then()` on peut appeler l'argument comme on veut, ici `data` et on l'affiche simplement.
Il nous reste à gérer les éventuelles erreurs, voici le script complet :
```javascript
fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById(
            'getResponse'
        ).innerHTML = `${data.results.prenom} ${data.results.status}`;
    })
    .catch(err => console.error(err));
```
La méthode `.catch()` sera appelé automatiquement si une erreur se produit.

Voici maintenant la deuxième méthode, pour commencer on va introduire deux nouveaux mots-clés : `async` et `await`.
Pour les utiliser, on doit déclarer une fonction `async` pour asynchrone, et on pourra utiliser le mot-clé `await` dans cette fonction.
```javascript
async function getRequest(e) {
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById('getResponse').innerHTML = `${data.results.prenom} ${data.results.status}`; 
}
```
On déclare donc notre fonction `async` et on attend littéralement avec `await` que chaque ligne soit exécutée avant de passer à la suivante.
Pour gérer les erreurs de ce type de requête, un try catch peut être une façon de faire.
**_Ces mots-clés ne sont disponibles que dans le cas ou on gère des promesses dans notre code._**
Nous verrons les promesses en détail plus tard.


Voici maintenant un exemple requête POST avec de fetch :
Une particularité, pour que PHP reçoive une POST request et qu'on ait accès à la global `$_POST`; on doit se servir du constructeur `new Request()`
```javascript
let formData = new FormData(this); // récupération du formulaire

// Le premier argument du constructeur est note url, le second est un objet option
let req = new Request('server/postjson.php', {
    method: 'POST',
    body: formData,
});

// On a la requête, on peut envoyer
fetch(req)
    .then(res => res.json())
    .then(data => {
        document.getElementById('postResponse').innerHTML = `
        <p>status:${data.results.status}:</p> <p>nom:${data.results.contact.nom},</p><p>prenom: ${data.results.contact.prenom}</p>`;
    })
    .catch(err => console.error(err));
```
La syntaxe ne change pas.
