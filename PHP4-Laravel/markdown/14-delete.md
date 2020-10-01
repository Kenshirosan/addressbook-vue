# Effacer des resources

Pour effacer des resources, rien de plus simple.
- On récupère la resource.
- On vérifie que l'utilisateur a la permission d'effacer la resource.
- On efface la resource.

> On ne gère toujours pas les permissions...

On ajoute un formulaire sur la page édition de d'article :  

`articles/edit.blade.php`
```blade
<form action="/article/{{ $article->id }}/delete" method="POST">
    @csrf
    @method('DELETE')
    <input type="submit" value="Effacer l'article">
</form>
```
> Notez l'ajout de la méthode http `@method('DELETE')`  

`routes/web.php`
```php
Route::delete('article/{article}/delete', [ArticlesController::class, 'delete']);
```
`ArticlesController`
```php
public function delete(Article $article)
{
    // vérification des permissions plus tard
    $article->delete();
}
```
Et c'est tout...
La facilité avec laquelle on peut réaliser une application CRUD est admirable.
Dans la leçon suivante, on modifiera nos contrôleurs pour rediriger l'utilisateur et envoyer un message de succès ou d'erreur si nécessaire.
