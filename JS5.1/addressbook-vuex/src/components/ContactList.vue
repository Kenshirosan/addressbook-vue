<template>
    <ContactCard :contact="contact" :index="index"></ContactCard>
</template>

<script>
    import ContactCard from './ContactCard.vue';

    export default {
        components: { ContactCard },

        name: 'ContactList',

        props: ['contact', 'index'],
    };
</script>
