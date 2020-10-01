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
                    <strong>{{ name | ucfirst }}:</strong>
                    <span v-if="name === 'city'">{{ value | ucfirst }}</span>
                    <span v-else>{{ value }}</span>
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
            <button @click="deletingOneContact" class="btn btn-xs btn-danger">
                Effacer
            </button>
        </li>
    </ul>
</template>

<script>
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
                this.refreshDates();
            }, 60000);
        },

        mounted() {
            this.refreshDates();

            setTimeout(() => {
                this.$el.classList.add('is-active');
            }, 500);
        },

        watch: {
            contact: {
                handler: function() {
                    this.refreshUpdated();
                },
                deep: true
            }
        },

        filters: {
            ucfirst(string) {
                return string.charAt(0).toUpperCase() + string.substring(1);
            }
        },

        methods: {
            refreshCreated() {
                this.created_at = `<p><strong>Creer: </strong>${moment(
                    this.contact.created_at
                ).fromNow()}</p>`;
            },

            refreshUpdated() {
                this.updated_at = `<p><strong>Mis a jour: </strong>${moment(
                    this.contact.updated_at
                ).fromNow()}</p>`;
            },

            refreshDates() {
                this.refreshCreated();
                this.refreshUpdated();
            },

            editing() {
                this.editingContact({
                    index: this.$props.index,
                    contact: this.contact,
                });
            },

            deletingOneContact() {
                this.deletingContact(this.$props.index);
            },
        },
    };
</script>

<style>
    ul {
        transform: translateY(-2000px) scale(2);
        opacity: 0;
        transition: 500ms ease-in;
    }

    ul.is-active {
        opacity: 1;
        transform: translateX(0px) scale(1);
    }

    li:nth-child(odd) {
        transform: rotate(1deg);
    }

    li:nth-child(even) {
        transform: rotate(-1deg);
    }

    li:nth-child(odd) p strong, li:nth-child(odd) div {
        transform: rotate(-1deg);
    }

    li:nth-child(even) p strong, li:nth-child(even) div {
        transform: rotate(1deg);
    }
</style>
