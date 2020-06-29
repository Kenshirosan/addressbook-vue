<template>
    <ul class="list-group col-md-4 contact-list mb-10 mt-10 list-group-flush">
        <li
            class="list-group-item"
            v-for="(value, name) of contact"
            v-if="name !== 'updated_at' && name !== 'created_at'"
            :data-field="name"
            @dblclick="editing"
        >
            <div>
                <p>
                    <strong>{{ name }}:</strong> {{ value }}
                </p>
            </div>
        </li>

        <li v-else-if="name === 'created_at'">
            <div v-html="dateCreated"></div>
        </li>

        <li v-else-if="name === 'updated_at' && value !== ''">
            <div v-html="dateUpdated"></div>
        </li>

        <li class="list-group-item">
            <button @click="deleting" class="btn btn-xs btn-danger">
                Effacer
            </button>
        </li>
    </ul>
</template>

<script>
    import { mapMutations } from 'vuex';
    import moment from 'moment';
    import events from '../mixins/globalEvents';

    export default {
        name: 'ContactCard',
        mixins: [events],

        props: {
            contact: {},
            index: Number,
        },

        created() {
            moment.locale('fr');
        },

        computed: {
            dateCreated() {
                return `<p><strong>Creer: </strong>${moment(
                    this.contact.created_at
                ).fromNow()}</p>`;
            },

            dateUpdated() {
                return `<p><strong>Mis a jour:</strong>${moment(
                    this.contact.updated_at
                ).fromNow()}</p>`;
            },
        },

        methods: {
            ...mapMutations(['deleteOneContact']),

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
