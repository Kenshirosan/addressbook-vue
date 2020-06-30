<template>
    <ContactCard
        v-if="contactsExist"
        :contact="contact"
        :index="index"
    >
    </ContactCard>
</template>

<script>
    import ContactCard from './ContactCard.vue';

    export default {
        components: { ContactCard },
        props: ['contact', 'contactsExist', 'index'],

        name: 'ContactList',
    };
</script>
