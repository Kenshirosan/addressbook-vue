# Computed Properties

Une 'Computed Property' est un objet qui contient des méthodes.

C'est l'équivalent du Data Object mais dynamique.

Une 'Computed Property' est calculée de manière dynamique en fonction de la valeur d'autres propriétés.

Créons un objet data et regardons ses propriétés en détail :

```javascript
new Vue({
    el: '#app',
  
    data() {
        return {
            tasks: [
                { description: 'Faire des courses', done: true },
                { description: 'Reviser', done: false },
                { description: 'Lire mes emails', done: false },
                { description: 'Faire le menage', done: true },
            ],
        };
    },
});
```

On a un liste de tâches, certaines sont effectuées, d'autres non.
On veut les afficher sur la page selon leur statut, le problème est qu'avec une directive traditionelle v-for, on ne peut pas les trier. C'est ici qu'interviennent les 'computed properties'.

Le code, et les explications après :
```javascript
new Vue({
    el: '#app',
    components: { HeaderTemplate, FooterTemplate },
    data() {
        return {
            isVisible: true,
            tasks: [
                { description: 'Faire des courses', done: true },
                { description: 'Reviser', done: false },
                { description: 'Lire mes emails', done: false },
                { description: 'Faire le menage', done: true },
            ],
        };
    },

    computed: {
        // Filtrage des tasks en fonction du statut
        tasksNotDone() {
            return this.tasks.filter(task => !task.done);
        },

        tasksDone() {
            return this.tasks.filter(task => task.done);
        },
    },
});
```
**Petit rappel à propos de la fonction flèche :**
_Une fonction flèche sur une ligne effectue un retour implicite des données._

L'argument de la fonction new Vue({}) est donc un objet, une des propriétés de cet objet est `computed`

Cette propriété accepte des méthodes et elle retourne le calcul de ces méthodes sous forme de propriétés de l'objet data.
Ainsi, on peut y accéder dans le template de la même manière dont on accède aux data object.

Un exemple rendra le tout plus intelligible :
On se sert des computed properties pour afficher les tâches selon leur statut :
Lisez le code attentivement, on accède aux computed properties directement en référençant le nom des méthodes.
```html
<ul>
    <li
        v-for="task in tasksDone"
        v-text="task.description"
    ></li>
</ul>
<h3>Tasks Not Done</h3>
<ul>
    <li
        v-for="task in tasksNotDone"
        v-text="task.description"
    ></li>
</ul>
```
On passe la méthode en référence, dans la directive v-for, et Vue.js fait le reste.
