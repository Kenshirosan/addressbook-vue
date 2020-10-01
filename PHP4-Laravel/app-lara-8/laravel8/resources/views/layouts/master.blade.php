<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>@yield('title')</title>
        <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    </head>
    <body>
        <div class="content" id="app">
            <h1>Laravel 101</h1>
            @include('partials.messages')
            <a href="/">Home</a>
{{--            @can('see-admin-menu')--}}
{{--                <a href="/articles/create">Créer un article</a>--}}
{{--            @endcan--}}
            @if(auth()->user() && auth()->user()->can('create', 'App\Models\Article'))
                <a href="/articles/create">Créer un article</a>
            @endif
            @can('create', 'App\Models\Article')
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
                <form action="/logout" method="POST">
                    <input type="submit" value="Déconnexion">
                </form>
            @endauth
            @yield('content')
{{--            @inertia--}}
        </div>

{{--    <script src="/js/app.js"></script>--}}
    </body>
</html>
