// Quand on travaille dans une application faite avec Vue.js, on a accès à des fichiers .vue
// Dans ce cas la syntaxe est differente.
export default Vue.component('TaskList', {
    // L'élément template et l'élément script en action.
    // Un composant Vue.js doit être composé d'un seul root Element dans le template, ici la <ul>
    // Enlevez la <ul> et lire le message d'erreur dans la console

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
