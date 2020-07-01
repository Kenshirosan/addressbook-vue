<template>
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
                type="button"
                id="js-clear-storage"
                class="btn btn-xs btn-danger mb-10"
                @click="deleteContacts"
            >
                Supprimer tous les contacts
            </button>
            <h3 v-if="isVisible && ! editMode">Ajouter un contact</h3>
            <h3 v-if="editMode">Edition</h3>
            <form
                v-if="isVisible"
                @submit.prevent="submitContact"
                @keydown="resetError"
            >
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control form-control-lg"
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
    import requests from '../requests';
    import events from '../events';

    export default {
        mixins: [requests, events],

        name: 'ContactForm',

        data() {
            return {
                error: '',
                editMode: false,
                contactIndex: Number,
                isVisible: false,
                isValidForm: false,
                contact: {},
                btnText: 'Ajouter un contact',
            };
        },

        created() {
            window.events.$on('editing', payload => {
                this.isVisible = true;
                this.contactIndex = payload.index;
                this.contact = payload.contact;
                this.btnText = 'Annuler';
                this.editMode = true;
            });

            window.events.$on('deleting', payload => {
                this.$parent.deleteContact(payload);
                this.flash('Contact Deleted', 'danger');
            });
        },

        mounted() {
            this.getInitialContact();
        },

        methods: {
            getInitialContact() {
                this.contact = {
                    email: '',
                    address: '',
                    city: '',
                    zip: '',
                    created_at: new Date(),
                    updated_at: '',
                };
            },

            showForm() {
                if(this.editMode) {
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
                    this.contact.updated_at = new Date();

                    this.$parent.updateContact(
                        this.contactIndex,
                        this.contact
                    );

                } else {
                    this.$parent.newContact(this.contact);
                    message = 'Contact successfully created';
                }

                this.flash(message);
                this.resetForm();
            },

            deleteContacts() {
                this.$emit('contactsEmpty');
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
