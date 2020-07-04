<template>
    <ul class="list-group col-md-4 contact-list mb-10 mt-10 list-group-flush">
        <li
            class="list-group-item"
            v-for="(value, name) of contact"
            v-if="name !== 'updated_at' && name !== 'created_at'"
            @dblclick="editing"
        >
            <div>
                <p>
                    <strong>{{ name }}:</strong> {{ value }}
                </p>
            </div>
        </li>

        <li v-else-if="name === 'created_at'" class="list-group-item">
            <div v-html="created_at"></div>
        </li>

        <li v-else-if="name === 'updated_at' && value !== ''" class="list-group-item">
            <div v-html="updated_at"></div>
        </li>

        <li class="list-group-item">
            <button @click="deleting" class="btn btn-xs btn-danger">
                Effacer
            </button>
        </li>
    </ul>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import moment from 'moment';
    import events from '../events';

    export default {
        name: 'ContactCard',

        mixins: [events],

        data() {
            return {
                created_at: '',
                updated_at: '',
            }
        },

        props: {
            contact: {},
            index: Number,
        },

        created() {
            moment.locale('fr');

            setInterval(() => {
                this.refreshCreated();
                this.refreshUpdated();
            }, 60000);
        },

        mounted() {
            this.refreshCreated();
            this.refreshUpdated();
        },

        methods: {
            ...mapMutations(['deleteOneContact']),

            refreshCreated() {
                this.created_at = `<p><strong>Creer: </strong>${moment(
                    this.contact.created_at
                ).fromNow()}</p>`;
            },

            refreshUpdated() {
                this.updated_at = `<p><strong>Mis a jour:</strong>${moment(
                    this.contact.updated_at
                ).fromNow()}</p>`;
            },

            editing() {
                this.editingContact({
                    index: this.$props.index,
                });
            },

            deleting() {
                this.deleteOneContact({ index: this.$props.index });

                this.$store.dispatch('setHasContacts');

                this.flash('Contact Deleted', 'info');
            },
        },
    };
</script>
