<template>
    <table class="table table-striped table-dark">
        <thead>
        <tr class="table-primary">
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Zip</th>
            <th>Creer</th>
            <th>Mis a jour</th>
            <th>Editer</th>
            <th>Effacer</th>
        </tr>
        </thead>
        <tbody>
            <DataTable
                v-for="(contact, index) in contacts"
                :key="index"
                :index="index"
                :contact="contact"
            ></DataTable>
        </tbody>
    </table>
</template>

<script>
    import DataTable from "./DataTable";

    export default {
        name: "Table",

        components: { DataTable },

        props: ['contacts'],

        mounted() {
            setTimeout(() => {
                document.querySelector('tbody').classList.add('is-active');
            }, 100);
        }
    }
</script>

<style scoped>
    table {
        overflow: hidden;
    }
    tbody {
        overflow: hidden;
        transform: translateX(-200px);
        transform-origin: left;
        opacity: 0;
        transition: all 100ms ease-in-out 350ms;
    }

    tbody.is-active {
        opacity: 1;
        transform: rotate(0deg);
    }
</style>