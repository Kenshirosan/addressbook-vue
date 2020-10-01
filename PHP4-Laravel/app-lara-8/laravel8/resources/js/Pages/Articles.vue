<template>
    <div>
        <ul>
            <li v-for="article in articles">
                <a :href="'/article/' + article.id">{{ article.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['articles'],
    };
</script>
