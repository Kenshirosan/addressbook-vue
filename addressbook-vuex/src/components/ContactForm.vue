<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <button
                    type="button"
                    id="js-form-visible"
                    @click.prevent="showForm"
                    class="btn btn-xs btn-primary mb-10"
                >
                    {{ btnText }}
                </button>
                <button
                    v-if="contactsExist"
                    type="button"
                    id="js-clear-storage"
                    class="btn btn-xs btn-danger mb-10"
                    @click="deleteContacts"
                >
                    Supprimer tous les contacts
                </button>
            </div>
        </div>
        <div class="form-container" :class="classes">
            <h3 :class="classes" v-if="!editMode">Ajouter un contact</h3>
            <h3 :class="classes" v-if="editMode">Edition</h3>
            <form
                :class="classes"
                @submit.prevent="submitContact"
                @keydown="resetError"
            >
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control form-control-lg"
                            :class="classes"
                            id="email"
                            name="email"
                            v-model="contact.email"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="address">Address</label>
                        <input
                            type="text"
                            class="form-control form-control-lg"
                            :class="classes"
                            id="address"
                            name="address"
                            v-model="contact.address"
                            placeholder="1234 Main St"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="city">City</label>
                        <input
                            type="text"
                            class="form-control form-control-lg"
                            :class="classes"
                            name="city"
                            v-model="contact.city"
                            id="city"
                            placeholder="city"
                        />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="zip">Zip</label>
                        <input
                            type="text"
                            name="zip"
                            class="form-control form-control-lg"
                            :class="classes"
                            v-model="contact.zip"
                            id="zip"
                            placeholder="12345"
                        />
                    </div>
                </div>
                <div class="form-control-lg mt-10">
                    <button type="submit" class="btn btn-success">
                        Enregister
                    </button>
                    <button
                        type="button"
                        id="cancel"
                        class="btn btn-warning"
                        @click="resetForm"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';
    import events from '../events';

    export default {
        mixins: [events],

        name: 'ContactForm',

        data() {
            return {
                error: '',
                editMode: false,
                isVisible: false,
                isValidForm: false,
                btnText: 'Ajouter un contact',
            };
        },

        computed: {
            ...mapState(['contactsExist', 'contact']),

            classes() {
                return this.isVisible ? `is-active` : ``;
            },
        },

        created() {
            window.events.$on('editing', payload => {
                this.isVisible = true;
                this.$store.dispatch('editContact', { index: payload.index });
                this.btnText = 'Annuler';
                this.editMode = true;
            });
        },

        mounted() {
            this.getInitialContact();
        },

        methods: {
            ...mapMutations([
                'addContact',
                'getInitialContact',
                'persistUpdate',
            ]),

            showForm() {
                if (this.editMode) {
                    return this.resetForm();
                }

                this.btnText =
                    this.btnText === 'Ajouter un contact'
                        ? 'Annuler'
                        : 'Ajouter un contact';

                this.isVisible = !this.isVisible;

                return this.getInitialContact();
            },

            submitContact() {
                this.checkFormFields(this.contact);

                if (this.isValidForm) {
                    this.persistForm(this.contact);
                }
            },

            persistForm(contact) {
                let message = 'Contact successfully updated';

                if (this.editMode) {
                    contact.updated_at = new Date();

                    this.persistUpdate();
                } else {
                    this.addContact({ contact });

                    this.$store.dispatch('setHasContacts');

                    message = 'Contact successfully created';
                }

                this.flash(message);
                this.resetForm();
            },

            deleteContacts() {
                this.$store.dispatch('deleteContacts');

                this.$store.dispatch('setHasContacts');

                this.flash('Contacts successfully deleted', 'primary');
            },

            checkFormFields(contact) {
                for (let field in contact) {
                    if (contact[field] === '' && field !== 'updated_at') {
                        this.isValidForm = false;
                        return this.createErrorMessage(field);
                    }

                    this.isValidForm = true;
                }
            },

            createErrorMessage(field) {
                const element = document.getElementById(field);
                const error = document.createElement('div');
                error.setAttribute('id', 'error-message');
                error.classList.add('alert', 'alert-danger');
                const emptyContactMessage =
                    '<span class="text-danger">Tous les champs du formulaire doivent etre remplis</span>';
                this.error = `${field} est vide : ${emptyContactMessage}`;
                error.innerHTML = this.error;
                element.parentNode.insertBefore(error, element.nextSibling);
            },

            resetForm() {
                this.getInitialContact();
                this.editMode = false;
                this.isVisible = false;
                this.btnText = 'Ajouter un contact';
            },

            resetError() {
                if (this.error) {
                    this.error = '';
                    document.getElementById('error-message').remove();
                }
            },
        },
    };
</script>

<style scoped>
    .form-container {
        overflow: hidden;
        background-color: rgba(24, 28, 58, 0.8);
        border-radius: 20px;
        z-index: 100;
        width: 50vw;
        height: 60vh;
        position: absolute;
        top: calc(50% - 400px);
        left: calc(50% - 479.5px);
    }
    .form-container h3 {
        position: relative;
        top: 40px;
        text-align: center;
        color: white;
        transition: all 500ms cubic-bezier(0, 0.6, 0.35, 1.4);
    }

    .form-container,
    form {
        overflow: hidden;
        transform-origin: center;
        opacity: 0;
        transform: rotate(90deg) scale(0.5) translate(100px, -300px);
        transition: all 500ms cubic-bezier(0, 0.6, 0.35, 1.4);
    }

    form {
        position: relative;
        top: calc(50% - 240px);
        left: calc(50% - 235px);
        z-index: 1000;
    }

    .form-container.is-active,
    form.is-active,
    form.is-active h3 {
        z-index: 1000;
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    input {
        transform: rotateY(90deg);
        transition: all 500ms ease-in-out 250ms;
        transform-origin: left;
        opacity: 0;
    }

    input.is-active {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }
</style>
