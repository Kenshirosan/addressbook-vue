# Mise à jour de resources
La mise à jour est également très facile.
- On récupère la resource (on sait faire).
- On pré-rempli les champs du formulaire.
- On vérifie que l'utilisateur a la permission de mettre à jour.
- Et on met à jour.

> Encore une fois, on ne gère pas les permissions pour l'instant.

Dans le fichier `articles/show.blade.php`, ajoutez un lien sur la page comme ceci :
```blade
<a href="/article/{{ $article->id }}/edit">Éditer l'article</a
```
Ajoutez une route :

`routes/web.php`
```php
Route::get('article/{article}/edit', [ArticlesController::class, 'edit']);
```

Puis une méthode dans le contrôleur :  
`ArticlesController`
```php
public function edit(Article $article)
{
    return view('articles.edit', compact('article'));
}
```
On va chercher l'article exactement de la même manière que pour le lire sur une page. On retourne une vue différente c'est tout.

`articles/edit.blade.php`
```blade
@extends('layouts.master')

@section('title')
Éditer l'article {{ $article->title }}
@endsection

@section('content')
    <form action="article/{{ $article->id }}/edit" method="POST" enctype="multipart/form-data">
        @include('partials.article-form')
    </form>
@endsection
```

Nous avons modifié la syntaxe du fichier `partials/article-form` pour y ajouter la méthode `old()`.  
On a passé deux arguments qui permettent de faire plusieurs choses :
- Si on a déjà envoyé le formulaire au serveur et qu'une erreur a été retourné, le premier argument ré-affiche ce que l'utilisateur a tapé dans le champ.
- Le deuxième vérifie si on a une variable `$article` et si `$article->title` a une valeur, le formulaire prend cette valeur, sinon, la valeur est `null`.
```html
<input type="text" name="title" value="{{ old('title',  isset($article->title) ? $article->title : null) }}">
<textarea name="body" id="" cols="30" rows="10">{{ old('body',  isset($article->body) ? $article->body : null) }}</textarea>
<input type="file" name="image">
<button type="submit">Enregistrer</button>
```
> Notez qu'on ne s'occupe toujours pas de l'image. On verra ça plus tard.

Sur notre page `articles/edit.blade.php`, le formulaire est pré-rempli avec les bonnes informations.
L'action du formulaire est correcte, il ne nous reste qu'à ajouter la route pour la mise à jour et la méthode du contrôleur :  
`routes/wep.php`
```php
Route::patch('/article/{article}/edit', [ArticlesController::class, 'update']);
```
La méthode `patch` est utilisé pour signifier au framework qu'on va faire un mise à jour.
Les navigateurs ne comprennent pas ces méthodes. Ils comprennent uniquement `GET` et `POST`. On laisse donc cette méthode à notre formulaire, mais on va y ajouter un champ qui précisera notre intention au framework et par conséquent au serveur :  
```blade
@section('content')
    <form action="/article/{{ $article->id }}/edit" method="POST" enctype="multipart/form-data">
        @csrf
        @method('patch')
        @include('partials.article-form')
    </form>
@endsection
```
On est prêt à tester si tout fonctionne, testez l'action `update` du contrôleur avec la méthode `dd()`, on accepte la requête et l'article :  
```php
public function update(Request $request, Article $article)
{
    dd($article, $request->all());
}
```
Vous pouvez faire la validation vous-même, voici la méthode pour mettre à jour l'article :
```php
public function update(Request $request, Article $article)
{
    // vérification des permissions plus tard
    // validation

    $article->update($request->all());
}
```
On appelle la méthode `update()` directement sur l'instance de l'article.
N'oubliez pas de vérifier ce que retourne la méthode `update()`.
