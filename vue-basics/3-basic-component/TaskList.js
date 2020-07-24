// Quand on travaille dans une application faite avec Vue.js, on a acces a des fichiers .vue
// Dans ce cas la syntaxe des differente.
export default Vue.component('TaskList', {
    // L'element template et l'element script en action.
    // Un composant Vue.js doit etre compose d'un seul root Element dans le template, ici la <ul>
    // Enlevez la <ul> et lire le message d'erreur dans la console

    template: `
        <ul class="mt-1em">
            <li>Faire de courses</li>
            <li>Reviser les tableaux</li>
            <li>Reviser les objets JS</li>
            <li>Faire quelque requetes SQL</li>
            <li>{{ message }}</li>
        </ul>`, // Attention a la virgule.. facile de l'oublier..

    // Dans un composant le data object ***DOIT*** etre une fonction qui retourne un objet
    data() {
        return {
            message:
                'Dans un composant le data object ***DOIT*** etre une fonction qui retourne un objet',
        };
    },
});
