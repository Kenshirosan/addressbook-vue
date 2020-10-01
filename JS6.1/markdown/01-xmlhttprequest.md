# AJAX

JavaScript peut envoyer des requêtes http vers un serveur pour obtenir des informations.
AJAX signifie Asynchronous JavaScript And XML, XML est juste la pour des raisons historique, le format de transfert de données qui s'est imposé est le JSON, on n'est pas obligé d'utilisé le XML. 

## XMLHttpRequest

##### Commençons par voir la méthode la plus ancienne :  
XMLHttpRequest est un objet qui permet de faire des requêtes http en JavaScript.
La raison principale pour continuer à utiliser cet objet de nos jours est la possibilité de traquer l'avancée d'un upload, ce qu'on ne peut pas encore faire avec la méthode `fetch` qui est la méthode moderne.

On construit une requête de ce type en trois étapes.
Voici un exemple pour une requête GET.
On commence par crée l'objet qui va nous servir pour la requête :
```javascript
let xhttp = new XMLHttpRequest();
```

On initialize la requête :
```javascript
const data = {
    nom: nom,
    prenom: prenom,
};
//on spécifie le type requête, les paramètres éventuels, et les options. Le true signifie async: true, pour un requête asynchrone.
xhttp.open('GET', 'server/getjson.php?nom=' + data.prenom, true);
```
Et on envoie la requête
```javascript
xhttp.send();
```

On peut éventuellement specifier un timeout en millisecondes :
```javascript
xhr.timeout = 3000;
```
Ensuite on doit écouter les events de xhttp pour récupérer la réponse.
Il y en a trois principales :
* load, qui sera émise si la requête s'est exécutée correctement
* error, qui sera émise si une erreur se produit 
* progress, qui est émise quand on transfère des données.

```javascript
xhttp.onload = function () {
    // Si la requête s'est bien passée
    if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.response); // On reçcoit une réponse du serveur
        
        // On affiche la réponse.
        document.getElementById( 
            'getResponse'
        ).innerHTML = `<p>Status: ${response.results.status}
            Query: ${response.results.prenom}</p>`;
    } else {
         // On gère un code d'erreur type erreur 404 not found par exemple
    }
};

 xhttp.onerror = function () {
    // se déclenche quand la requête n'a pas pu se faire. Pas de réseau par exemple
    console.log('error');
};

xhttp.onprogress = function (event) {
    console.log(event);
     // on peut traquer combien de bytes on a reçu en réponse.
    console.log(event.loaded);
};
```
Il exists bien d'autres options telle que `reponseType` pour indiquer le type de réponse que l'on attend, ce type d'options se déclare avant d'envoyer la requête.

Un exemple de requête POST :
```javascript
let xhttp = new XMLHttpRequest();

// On utilise un objet formdata pour s'assurer que le serveur reçoive correctement les données
// le this ici représente le formulaire passée directement en argument du formdata
const formData = new FormData(this);

xhttp.open('POST', 'server/postjson.php');

// On attend une réponse en JSON, nous évite d'appeler la méthode JSON.parse sur la réponse
xhttp.responseType = 'json';

xhttp.send(formData);

xhttp.onload = function() {
    if (this.readyState === 4 && this.status === 200) {
        let response = xhttp.response;

        document.getElementById(
            'postResponse'
        ).innerHTML = `<p>${response.results.status}</p>`;
    }
};
```
