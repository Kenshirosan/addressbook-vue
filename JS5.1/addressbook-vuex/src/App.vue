<template>
    <div class="app">
        <header class="mb-5-percent">
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img
                            alt="Vue logo"
                            src="./assets/logo.png"
                            width="30"
                            height="30"
                            class="d-inline-block align-top"
                            loading="lazy"
                        />
                        Carnet d'addresses
                    </a>
                </div>
            </nav>
        </header>

        <div class="container mt-10">
            <section class="form">
                <ContactForm ref="contactForm"></ContactForm>
            </section>
<!--            <section class="row" v-if="contactsExist">-->
<!--                <p class="text-info">-->
<!--                    <em>Double cliquez sur un contact pour l'editer</em>-->
<!--                </p>-->
<!--                <ContactList-->
<!--                    v-for="(contact, index) in contacts"-->
<!--                    :key="index"-->
<!--                    :contact="contact"-->
<!--                    :index="index"-->
<!--                >-->
<!--                </ContactList>-->
<!--            </section>-->

            <section v-if="contactsExist">
                <Table
                    :contacts="contacts"
                ></Table>
            </section>

            <section class="row" v-else>
                <h2>Pas de contacts</h2>
            </section>
            <flash></flash>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import events from './events';
    import ContactForm from './components/ContactForm.vue';
    import ContactList from './components/ContactList.vue';
    import Table from './components/Table.vue';
    import flash from './components/Flash.vue';

    export default {
        name: 'App',

        mixins: [events],

        components: {
            ContactForm,
            ContactList,
            Table,
            flash,
        },

        computed: {
            ...mapState(['contacts', 'contactsExist']),
            ...mapGetters(['getContactsFromLocalStorage']),
        },

        mounted() {
            this.getContactsFromLocalStorage();

            this.$store.dispatch('setHasContacts');

            setTimeout(() => {
                this.$el.classList.add('is-active');
            }, 100);
        },

    };
</script>

<style>
    body {
        background-color: #2c3e50;
        /*overflow: hidden;*/
    }
    .app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        transition: all 250ms ease-in;
        margin-top: 200px;
        opacity: 0;
    }
    .app.is-active {
        opacity: 1;
        margin-top: 0;
    }
    .mb-10 {
        margin-bottom: 10px;
    }

    .mb-5-percent {
        margin-bottom: 5%;
    }

    .mt-10 {
        margin-top: 10px;
    }

    h3, h2 {
        margin: 40px 0 0;
        color: white;
    }
    ul {
        list-style-type: none;
        padding: 0;
        color: white;
        background-color: transparent;
    }
    li.list-group-item {
        background-color: rgba(55, 55, 55, 0.5);
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

    li:first-of-type {
        background-color: rgba(0, 255, 150, 0.1);
        color: white;
        font-size: 20px;
        font-weight: bold;
    }

    li:first-of-type:hover {
        cursor: pointer;
    }

    li span {
        display: block;
    }

    #js-contact-list {
        width: 100%;
    }
</style>
