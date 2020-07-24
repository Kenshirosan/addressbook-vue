export default Vue.component('custom-event-handling', {
    template: `
        <div class="row">        
            <p>Aller dans l'onglet Vue de la console, puis dans l'onglet Event</p>
            <button @click="dispatchCustomEvent">Dispatch Event</button>
            
            <button @click="dispatchCustomEventWithPayload">Dispatch Event With Payload</button>
        </div>
    `,

    methods: {
        // Cette methode ne sert qu'a emettre un event custom.
        dispatchCustomEvent() {
            // pour emmettre un event custom, c'est aussi simple que ca.
            this.$emit('customevent');
            // On emet une event ici et on l'ecoute dans le parent, donc le fichier 4.1-custom-event-handling
        },

        dispatchCustomEventWithPayload() {
            // On peut aussi tranferer des donnees avec ces custom events.

            const payload = {
                event: 'custom',
                transmitted: true,
            };
            const test = 'testing vueJS';
            const allowedWords = ['un', 'deux', 'trois'];

            // les donnes seront transmises sous forme de tableau ou d'objet
            // ou une simple variable
            this.$emit('customeventwithpayload', {
                payload,
                test,
                allowedWords,
            });
        },
    },
});
