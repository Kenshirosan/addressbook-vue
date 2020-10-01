import moment from 'moment';

export default {
    state: {
        contacts: [],
        contact: {},
        key: `Contacts`,
        contactsExist: false,
    },

    getters: {
        getContactsFromLocalStorage: state => () => {
            return (state.contacts =
                JSON.parse(localStorage.getItem(state.key)) || []);
        },
    },

    actions: {
        setHasContacts({ commit }) {
            commit('setContactStatus');
        },

        deleteContacts({ commit }) {
            commit('deleteContactsFromLocalStorage');
        },

        editContact(context, { index }) {
            context.state.contact = context.state.contacts[index];
        },
    },

    mutations: {
        getInitialContact(state) {
            state.contact = {
                email: '',
                address: '',
                city: '',
                zip: '',
                created_at: new Date(),
                updated_at: '',
            };
        },

        setContactStatus(state) {
            return (state.contactsExist = state.contacts.length > 0);
        },

        addContact: ({ contacts, key }, { contact }) => {
            contacts.push(contact);

            return localStorage.setItem(key, JSON.stringify(contacts));
        },

        persistUpdate({ contacts, key }) {
            return localStorage.setItem(key, JSON.stringify(contacts));
        },

        deleteOneContact({ contacts, key }, { index }) {
            contacts.splice(index, 1);

            return localStorage.setItem(key, JSON.stringify(contacts));
        },

        deleteContactsFromLocalStorage({ contacts }, key) {
            contacts.length = 0;
            // return localStorage.removeItem(key);
        },
    },
};
