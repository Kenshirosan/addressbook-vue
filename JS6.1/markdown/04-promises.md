# Promesses et async / await

## Les promesses
Les promesses répondent à un problème récurrent en JavaScript connu sous le nom de 'callback hell'.
En effet, à cause de la nature synchrone du code, on est souvent obligé d'avoir des niveaux d'indentations remarquables à cause de fonctions de callback qui ne servent qu'a verifier que les méthodes qu'on appelle existent.
Imaginons qu'on ait un bouton dans notre HTML, et ce bouton fait quelque chose quand on le clique.
```javascript
let btn = document.querySelector('button');
btn.addEventListener('click', function() {
    // 
});
```
On ajoute un event listener sur le bouton, et on a une fonction de callback, dans cette fonction, on appelle un autre fonction. Si cette fonction met un peut de temps a être exécutée, on va avoir un problème.
```javascript
btn.addEventListener('click', function () {
    let users = getUsers();

    console.log(users);
});

function getUsers() {
    setTimeout(() => {
        return localStorage.getItem('users') || [];
    }, 1);
}
```
Notre fonction a pris un léger temps de retard, et quand on `console.log(users)` on obtient undefined, si on voulait appeler une autre fonction avec `users` en argument, ce serait un désastre.
La solution est de vérifier que `users` est égale à quelque chose.
```javascript
 if (users !== undefined) {
    // on peut faire qqchose
 } else {
    let noUsers = anotherFunction();
 }
```
Donc si on a `users`, on peut faire quelque chose, sinon, on appelle une autre fonction. Cette fonction met un peu de temps aussi pour être exécutée, et `noUsers` est aussi `undefined`, donc on va vérifier si `noUsers` est `undefined`, et s'il l'est on appelle encore une autre fonction, etc etc etc, et on peut se retrouver vite fait avec des codes comme suit :
```javascript
let users = getUsers();
if (users !== undefined) {
    // on peut faire qqchose
} else {
    users = getUsers();
    if (users !== undefined) {
        // on peut faire quelque chose
    } else {
        let noUsers = anotherFunction();
        if (noUsers !== undefined) {
            //
        } else {
            // ppfffff();
        }
    }
}
```
Cet exemple est extrême mais on trouve vraiment des codes comme ça au quotidien.
### Les promesses à la rescousse
Reprenons cet exemple de code, on veut récupérer une liste d'utilisateurs et la requête prend du temps,ensuite on veut toujours faire quelque chose avec cette liste, une promesse en JavaScript va permettre de faire cela sans avoir à écrire (trop) de test, une promesse apportera toujours une réponse, dès qu'elle l'aura obtenue et nous la fournira. En somme, on dit à JavaScript, promets moi de me donner un réponse et JavaScript tient sa promesse.

#### La syntaxe :
Reprenons la fonction `getUsers()` et modifions-la :
```javascript
function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let users = localStorage.getItem('users') || [];
            resolve(users);
        }, 1000);
    });
}
```
Le constructeur `new Promise` accepte une fonction en argument, cette fonction a deux argument: `resolve` et `reject`.
Dans notre exemple, on a 'enveloppé' notre demande au localstorage dans une promesse.
Ensuite on a appelé `resolve`, quand JavaScript obtient la réponse la méthode `resolve()` nous renvoie la promesse.
On s'en sert ainsi :
```javascript
btn.addEventListener('click', function () {
    let users = getUsers();
    console.log(users);
});
```
Dans la console, voici ce qu'on obtient :

![promise](img/promise.png)

On est prêts a gérer la promesse, voici le script :
```javascript
btn.addEventListener('click', function () {
    getUsers()
        .then(res => console.log(res))
        .catch(err => console.error(err));
        
    console.log('promesse finie');
});
```
Ici on obtient une liste d'utilisateurs ou tableau vide, la promesse a attendu que le code dans le setTimout s'exécute et nous a retourné le résultat.
On constate quand même que le `console.log()` situé après l'appel à la fonction s'exécute toujours en premier. L'avantage des promesses est aussi qu'on peut utiliser `async` / `await` pour littéralement mettre le code en pause tant qu'il n'est pas fini.
Modifions la notre `eventListener` pour utiliser ces mots-clés
```javascript
                            // La fonction callback doit être async
btn.addEventListener('click', async function () {
    // pour pouvoir utiliser await.
    let users = await getUsers();
    console.log(users);
        
    console.log('promesse finie'); // Ne s'exécute pas tant que le code avant n'est pas finie.
});
```
Modifions encore une fois le code pour gérer les erreurs :
```javascript
async function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Une petite modification pour utiliser `reject`, 
            // la promesse gèrera automatiquement l'erreur
            if (localStorage.getItem('users') === null) {
                reject(new Error('users is null'));
            }
            resolve(localStorage.getItem('users'));
        }, 1000);
    });
}
```
Une petite modification pour utiliser `reject`, 
la promesse gère automatiquement l'erreur et on la récupère dans le `catch()` :

```javascript
btn.addEventListener('click', async function () {
    await getUsers()
        .then(res => console.log(res))
        .catch(err => console.error(err.message));

    console.log('promesse finie'); // Ne s'exécute pas tant que le code avant n'est pas finie.
});
```
Le sujet des promesses est vaste, 
sachez qu'il y a également Promise.all pour gérer plusieurs promesses et d'autre méthodes.
Quand vous serez à l'aise sur ces :bases, lisez cette page pour apprendre le reste :
[Mozilla, promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
