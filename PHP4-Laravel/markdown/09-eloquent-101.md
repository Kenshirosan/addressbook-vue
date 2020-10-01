# Eloquent

Nous allons voir quelques requêtes basiques.
Démarrez `tinker` et tester ces lignes :
##### Select all
```php
User::all();
```
Laravel retourne automatiquement les résultats sous forme de collection `eloquent`, quin offre de méthodes pour travailler et qui peut être itéré comme un tableau classique  
Si la requête ne retourne rien, on obtiendra une collection vide.    
##### Select where
```php
$id = 1;
User::where('id', $id)->get();
User::where('admin', true)->get();
User::where('name', 'like', 'Kale')->get();
User::where('name', 'like', '%Kale%')->get();
User::where('id', '>', '4')->get();
```
##### Select where order by
```php
User::where('admin', false)->orderBy('id', 'DESC')->get();
```
On peut aussi demander autre chose qu'une collection :
```php
$id = 1;
User::where('admin', true)->get()->toArray();
User::where('id', $id)->get()->toJson();
```
##### Select limit
```php
User::limit(5)->get();
User::take(2)->get()->toJson();
```
Un tri un peu plus complexe, on obtient une collection, ensuite on la filtre :
```php
$users = User::all();
$users->takeUntil(function($user) { 
    return $user->id >= 3;
});
```
On peut enchaîner les méthodes :
```php
User::where('admin', false)->orderBy('id', 'desc')->limit(5)->get();
User::where('admin', false)->orderBy('name', 'desc')->take(3)->get();
```
On peut obtenir uniquement la première resources trouvées :
```php
User::first();
User::where('name', 'Kale Williamson')->first();
// ou le raccourci :
User::firstWhere('name', 'Kale Williamson');
```
On peut aussi faire `firstOr()` :
```php
User::where('id', '=', 12)->firstOr(function() {
    return User::where('name', 'like', '%Miss%')->get();
});
```
On peut demander de trouver une resource directement où de renvoyer `null`
```php
$id = 12;
User::find($id);
// ou plusieurs resources ...
$ids = [2, 5, 7];
Article::find($ids);
```
On peut demander la même chose mais avec un message d'erreur si la resource n'existe pas :
```php
User::findOrFail($id);
```

Il est naturellement impossible de lister toutes les méthodes disponibles ici, la documentation est complète et il vous faudra la lire.  
