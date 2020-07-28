# Précisions sur les modules

Avant de continuer avec les classes, quelques précisions sont nécessaires à propos des modules.

Dans l'exemple précédent, il y avait un fichier qui ne comportait qu'une classe, donc une seule chose à exporter.

Supposons qu'on ait un fichier avec différentes fonctions, et que l'on ne veuille en exporter que quelques une, la syntaxe sera la suivante:

```js
function commonHelper() {
    //
}

function validate() {
    //
}

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

//On exporte que les fonctions dont on a besoin..
export { ucfirst, validate };
```

Et quand on souhaite importer:

```js
// On importe ce dont on a besoin..
import { ucfirst, validate } from './fonctions.js;';
```

Et on oublie pas dans la balise script:

```js
<script type="module" src="index.js"></script>
```

[La suite pour les classes](heritage.html)

[3WAcademy](https://3wa.fr)
