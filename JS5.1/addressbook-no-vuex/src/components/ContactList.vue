<template>
    <ContactCard :contact="contact" :index="index"></ContactCard>
</template>

<script>
    import ContactCard from './ContactCard.vue';

    export default {
        components: { ContactCard },

        props: ['contact', 'index'],

        name: 'ContactList',
    };
</script>
