# Stockage des images.

Comme tout dans laravel, le stockage des images ou fichiers peut se faire de plusieurs façons, nous allons vous faire voir la méthode fournit avec le framework.  
Vous pouvez configurer le stockage dans le fichier `config/filesystem.php`.
Ici, on va se servir du stockage `public` qui sera accessible en lecture aux utilisateurs de l'application.

Modifions la méthode `store` dans `ArticlesController` pour utiliser ce `disk`
```php
Article::create([
    'title' => $request->title,
    'body' => $request->body,
    'user_id' => $request->user_id,
    'image' => $request->file('image')->store('img', 'public')
]);
```
On a modifié la méthode qui crée l'article pour enregistrer l'image dans le dossier `storage/app/public/img`, ce dossier sera créé automatiquement.  
La méthode `$request->file('image')` accepte le `name` du formulaire. 
> Le nom de l'image est changé et l'image est 'uploadée' et enregistrée en BDD.

Ensuite dans le template, on récupère l'image ainsi : 
```blade
<img src="{{ asset($article->image) }}" alt="image">
```
Si on essaye maintenant, ça ne marchera pas, nous devons créer un lien au niveau du système pour que cela fonctionne.

On débute par le tableau `links` dans le fichier de configuration `config/filesystem.php`, on ajoute une ligne pour notre dossier : 
```php
'links' => [
    public_path('storage') => storage_path('app/public'),
    // Ajout
    public_path('img') => storage_path('app/public/img'),
],
```
Ensuite on crée le lien :
```bash
php artisan storage:link
```
Et c'est tout.
