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
    }
</script>
