<template>
    <div class="content">
        <h1>Laravel 101</h1>

        <a href="/">Home</a>

        <a href="/articles/create">Créer un article</a>

        <a href="/articles">Articles</a>
        <a href="/contact-us">Contactez-nous</a>
        <a href="/about">À propos</a>

        <a href="/register">Créer un compte</a>
        <a href="/login">Login</a>

        <a href="/profile">Votre profil</a>
        <form action="/logout" method="POST">
            <input type="submit" value="Déconnexion" />
        </form>
    </div>
</template>

<script>
    export default {};
</script>
