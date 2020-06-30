export default {
    methods: {
        addToLocalStorage(key, items) {
            return localStorage.setItem(key, JSON.stringify(items));
        },

        getContactsFromLocalStorage(key) {
            return (this.contacts =
                JSON.parse(localStorage.getItem(key)) || []
            );
        },

        deleteContactsFromLocalStorage(key) {
            return localStorage.removeItem(key);
        }
    }
};
