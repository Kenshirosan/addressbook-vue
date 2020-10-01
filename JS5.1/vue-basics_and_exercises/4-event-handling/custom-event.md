# Custom Event Handling

Abordons les Customs Events, des évènements que nous créons selon les besoins. En effet, on veut parfois que notre code réagisse quand une chose spécifique s’est passée et les events natives ne sont pas toujours adaptés.

Pour bien comprendre comment fonctionne les events customs, On va travailler dans deux fichiers, le fichier HTML habituel, et un composant Vue.js.

Voici le composant :
```vue
export default Vue.component('custom-event-handling', {
    template: `
        <div class="row">
            <p>Aller dans l'onglet Vue de la console, puis dans l'onglet Event</p>
            <button @click="dispatchCustomEvent">Dispatch Event</button>

            <button @click="dispatchCustomEventWithPayload">Dispatch Event With Payload</button>
        </div>
    `,// Ne pas oublier pas la virgule...
});
```
Deux boutons, c’est tout. Toutefois quand on clique dessus, ceux-ci vont appeler des méthodes qui seront chargées d’émettre les customs events.  
Voyons-les maintenant :  
La méthode `dispatchCustomEvent()` ne sert qu’a émettre une event custom qu’on a appelé `customevent`  
La méthode `dispatchCustomEventWithPayload()` émet quant à elle une event custom avec des données : `customeventwithpayload`
```javascript
methods: {
    dispatchCustomEvent() {
        // pour émettre un event custom, c'est aussi simple que ca.
        this.$emit('customevent');
    },

    dispatchCustomEventWithPayload() {
        // On peut aussi tranférer des données avec ces custom events.
        const payload = {
            event: 'custom',
            transmitted: true,
        };
        const test = 'testing vueJS';
        const allowedWords = ['un', 'deux', 'trois'];

        // les données seront transmises sous forme de tableau ou d'objet
        // ou une simple variable
        this.$emit('customeventwithpayload', {
            payload,
            test,
            allowedWords,
        });
    },
},
```

La seule particularité des events est qu’on les écoute dans les éléments parents.  
Quand on veut servir de ce composant, on doit l’appeler ainsi `<custom-event-handling></custom-event-handling>` C’est la qu’on va écouter l’event. On change de fichier et voici le HTML qui reprend ce composant :
```vue
<div class"container">
   <h1Custom Event Handling</h1>
    <custom-event-handling
        @customevent="receivedEvent"
        @customeventwithpayload="receivedEventWithPayload"
    ></custom-event-handling>
</div>
```

On écoute cet event exactement de la même manière qu’une event classique, et quand on la reçoit, on appelle aussi une méthode. Voici les méthodes correspondantes :
```javascript
import CustomEventHandling from'./CustomEventHandling.js';
new Vue({
    el: '#app',
    components: { CustomEventHandling },
    methods: {
        //Sur le composant, on écoute l'event avec le @customevent, ou v-on:customevent
        // et on appelle cette methode.
        receivedEvent() {
            console.log('Event Received');
        },

        receivedEventWithPayload(payload) {
            console.log('Event Received, Payload:');
            console.log(payload);
        },
    },
});
```
