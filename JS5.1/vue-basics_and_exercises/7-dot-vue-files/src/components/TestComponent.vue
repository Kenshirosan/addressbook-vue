<template>
    <div>
        <p>test</p>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['exaampleprop'],

        data() {
            return {
                persons: [
                    { name: 'John Doe', age: 18 },
                    { name: 'Jack Doe', age: 30 },
                    { name: 'Jane Doe', age: 45 },
                ],
            };
        },
    };
</script>
