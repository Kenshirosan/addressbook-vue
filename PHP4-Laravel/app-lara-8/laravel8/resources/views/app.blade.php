<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>
    <body class="font-sans antialiased">
        <header>
            <nav>
                <h1>Laravel 101</h1>
            @include('partials.messages')
            <a href="/">Home</a>
{{--            @auth--}}
{{--                <a href="/articles/create">Créer un article</a>--}}
{{--            @endauth--}}
            @can('see-admin-menu')
                <a href="/articles/create">Créer un article</a>
            @endcan
            @auth
                @if(auth()->user()->can('create', Article::class))
                    <a href="/articles/create">Créer un article</a>
                @endif
            @endauth
            @can('create', auth()->user(), Article::class)
                <a href="/articles/create">Créer un article</a>
            @endcan
            <a href="/articles">Articles</a>
            <a href="/contact-us">Contactez-nous</a>
            <a href="/about">À propos</a>
            @guest
                <a href="{{ route('register') }}">Créer un compte</a>
                <a href="{{ route('login') }}">Login</a>
            @endguest
            @auth
                <a href="{{ route('profile') }}">Votre profil</a>
                <form action="{{ route('logout') }}" method="POST">
                    <input type="submit" value="Déconnexion" />
                </form>
            @endauth
            </nav>
        </header>
        @inertia
    </body>
</html>
