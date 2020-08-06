# Les composants Vue.js

Vue.js offre la possibilité de créer des 'components' réutilisable, c'est ici qu'on trouve la force de ce type de framework.

Un composant Vue.js est fait de markup HTML et de JavaScript et peut aussi comporter du css.

Il offre les mêmes possibilités qu'une instance de Vue. (méthodes, data object etc etc)

Quand on travaille dans une application faite avec Vue.js, on a accès à des fichiers avec l'extension .vue
Dans ce cas la syntaxe est differente. Nous la verrons plus tard.

Dans un composant le data object ***DOIT*** être une fonction qui retourne un objet

Un composant Vue.js doit être composé d'un seul root Element dans le template, dasn le composant suivant, ce sera une `<ul>`

Un composant doit être nommé, ici on a crée un composant TaskList, on pourra s'en servir dans le HTML en le référençant ainsi:
```html
<task-list>
```              
Voici le composant déclaré dans le fichier TaskList.js

```javascript
// export du composant.        // Nom du composant
export default Vue.component('TaskList', {
   
// Le template HTML
    template: `
        <ul class="mt-1em">
            <li>Faire de courses</li>
            <li>Reviser les tableaux</li>
            <li>Reviser les objets JS</li>
            <li>Faire quelque requetes SQL</li>
            <li>{{ message }}</li>
        </ul>`, // Attention à la virgule.. facile de l'oublier..

    // Dans un composant le data object ***DOIT*** être une fonction qui retourne un objet
    data() {
        return {
            message:
                'Dans un composant le data object ***DOIT*** être une fonction qui retourne un objet',
        };
    },
});
```

Voici comment on l'importe :

```javascript
import TaskList from './TaskList.js'; // Importer le composant

new Vue({
    el: '#app',
    components: { TaskList }, // NE pas oublier d'enregistrer le composant.
    data: {},
});
```
