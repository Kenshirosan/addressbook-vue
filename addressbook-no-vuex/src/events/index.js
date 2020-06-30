import Vue from 'vue';

window.events = new Vue();

export default {
    methods: {
        deletingContact(index) {
            window.events.$emit('deleting', index);
        },

        editingContact: function (payload) {
            window.events.$emit('editing', payload);
        },

        flash(message, level = 'success', duration = 3000) {
            window.events.$emit('flash', { message, level, duration });
        },
    },
};
