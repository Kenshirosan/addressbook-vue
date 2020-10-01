# Les routes

### Le fichier web.php
Dans le dossier routes de l'application, plusieurs fichiers sont présents.  
Pour cette introduction à laravel, nous allons nous concentrer sur le fichier web.php, qui gère par défaut le routeur 'html' de l'application. 

Voici ce qu'on trouve dans ce fichier avec une installation fraîche de laravel :
Avec laravel, cette syntaxe `Route::get(// ...)` s'appelle une façade. Une façade est une interface statique qui offre accès aux méthode de laravel, ce ne sont pas des méthodes statiques traditionnelles.
```php
Route::get('/', function () {
    return view('welcome');
});
```
Avec la classe `Route`, on appelle la méthode `get`, cette méthode prends deux arguments :
Le premier est l'URL où on veut aller, le deuxième est ici un callback qui nous retourne une vue.

Le dossier par défaut contenant les vues est le dossier `resources/views`.   
Vous trouverez dans ce dossier le fichier `welcome.blade.php`, c'est ce fichier qu'affiche la route `'/'`. (racine du site, page d'accueil).  
L'extension de fichier `blade` est l'extension que laravel utilise et qui offre des aides destinées à éviter de mélanger du HTML et du PHP façon 'spaghetti'.  

Pour commencer à travailler, on efface tout ce qu'il y a dedans, on garde uniquement un structure HTML de base.
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
    </head>
    <body>
        <h1>Laravel 101</h1>
    </body>
</html>
```
On peut voir dans ce fichier une syntaxe 'moustache' pour la valeur du tag `title`, c'est ce qui remplace le PHP dans blade et qui est compilé par la suite en PHP. Plus de détails sur ces fonctionnalités plus tard.

**Pour travailler efficacement, il est nécessaire de bien s'organiser.**
Laravel possède une communauté de développeurs immense et des pratiques standards sont apparues au fil du temps.  
Sans avoir la prétention d'être exhaustif, nous allons tenter de vous faire travailler selon ces standards.  
Commençons par créer un dossier `layouts`.
Ensuite on renomme le fichier `welcome.blade.php` en `master.blade.php` et on le glisse dans le dossier `layouts`.  
Enfin on modifie notre route comme suit :
```php
Route::get('/', function () {
    return view('layouts.master');
});
```
On utilise la 'dot syntax' au lieu du chemin de dossier plus classique `layouts/master`, même si cela fonctionne également.  

Ajoutons un lien à notre HTML :
```html
<body>
    <h1>Laravel 101</h1>
    <a href="/contact-us">Contactez-nous</a>
</body>
```
Si on clique sur ce lien maintenant, laravel va nous retourner automatiquement une erreur 404 et la page qui va avec.
Pour que ce lien fonctionne, on doit créer une route et demandez à cette route ce que l'on veut afficher :
```php
Route::get('/contact-us', function () {
    return view('layouts.contact');
});
```
Si vous cliquez maintenant sur ce lien, vous obtiendrez une page d'erreur qu'on vous encourage à lire. Bien souvent, le message d'erreur qu'on obtient nous décrit exactement le bug rencontré.
Ici, c'est très simple, il nous manque un fichier `contact.blade.php` dans le dossier `layouts`. A vous de le créer. 
#### Une brève introduction à blade
Blade est un moteur de template, il offre une quantité d'aide pour le développement.
Dans le fichier `contact.blade.php`, écrivez le lignes suivantes :
```blade
@extends('layouts.master')
<h2>Contactez nous !</h2>
```
la directive `@extends` permet de se servir du fichier `master`, qui contient le `doctype`, et donc le CSS et les futures balises javascript. Pour la partie front-end, nous verrons plus tard comment gérer avec laravel.    
On voit maintenant notre `h2` s'afficher mais il se positionne au-dessus du `h1` de la page `master`, si on fait `f12` et qu'on analyse le tout, on se rend compte que c'est même du grand n'importe quoi.
Pour corriger ça, on modifie le fichier `contact` :
```blade
@extends('layouts.master')

@section('content')
    <h2>Contactez nous !</h2>
@endsection
```
La directive `@section` va nous permettre d'injecter le code où on le veut sur la page.
Cette directive prend un ou plusieurs arguments, pour l'instant, on lui a juste donner le nom `content`
On doit aussi modifier le fichier `master` :
```blade
<h1>Laravel 101</h1>
<a href="/contact-us">Contactez-nous</a>

@yield('content')
```
La directive `@yield` accepte comme argument le nom de la `@section`, on peut maintenant afficher la page de contact proprement.
C'est tout pour l'instant sur les routes, les bases sont là pour afficher des pages simples, nous allons étudier d'autres parties du framework avant de revenir et de voir plus de possibilités avec les routes.
