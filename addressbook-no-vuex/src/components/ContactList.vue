<template>
        <ContactCard
            v-if="contactsExist"
            :contact="contact"
            :index="index"
            ref="contactCard"
        ></ContactCard>
</template>

<script>
    import ContactCard from './ContactCard.vue';
    import requests from '../mixins/requests';
    import events from '../mixins/globalEvents';

    export default {
        mixins: [requests, events],
        components: { ContactCard },
        props: ['contact', 'contactsExist', 'index'],

        name: 'ContactList',
    };
</script>
