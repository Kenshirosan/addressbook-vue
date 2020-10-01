export default Vue.component('custom-event-handling', {
    template: `
        <div class="row">        
            <p>Aller dans l'onglet Vue de la console, puis dans l'onglet Event</p>
            <button @click="dispatchCustomEvent">Dispatch Event</button>
            
            <button @click="dispatchCustomEventWithPayload">Dispatch Event With Payload</button>
        </div>
    `,

    methods: {
        // Cette méthode ne sert qu'a émettre un event custom.
        dispatchCustomEvent() {
            // pour émettre un event custom, c'est aussi simple que ca.
            this.$emit('customevent');
            // On émet une event ici et on l'écoute dans le parent, donc le fichier 4.1-custom-event-handling
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
});
