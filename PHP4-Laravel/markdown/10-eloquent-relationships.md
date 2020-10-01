# Les relations de base : Eloquent relationships
Comment faire pour joindre les tables avec `eloquent` ?  
On a dans notre BDD des tables avec des clés étrangères, avec laravel, il suffit de se poser une question simple pour savoir comment charger un utilisateur avec ses articles, ou un article avec ses commentaires etc etc..  
---
Un utilisateur peut-il écrire un ou plusieurs articles ? 
Un article peut-il comporter un ou plusieurs commentaires ?
#### belongsTo / hasMany
Gardons les choses simples pour l'instant et partons du principe qu'un utilisateur peut écrire plusieurs articles et qu'un article ne peut avoir qu'un auteur.
Même chose pour les commentaires.
Il nous suffit de modifier notre modèles pour mettre laravel au courant des relations dans notre BDD, le reste sera fait automatiqiuement.  
Reprenons nos modèles et modifions-les :

`User`
```php
// Ajout de méthodes
// Un utilisateur écrit plusieurs articles
public function articles()
{
    return $this->hasMany(Article::class);
}
// Un utilisateur écrit plusieurs commentaires
public function comments()
{
    return $this->hasMany(Comment::class);
}
```
`Article`
```php
// Un article n'a qu'un auteur
public function user()
{
    return $this->belongsTo(User::class);
}
// Un article peut avoir plusieurs commentaires
public function comments()
{
    return $this->hasMany(User::class);
}
```
`Comment`
```php
// Un commentaire n'a qu'un auteur
public function user()
{
    return $this->belongsTo(User::class);
}
// Un commentaire n'a qu'un article
public function article()
{
    return $this->belongsTo(User::class);
}
```
Comme on a respecté les conventions laravel sur les clés étrangères, ou la clé est nommée selon le nom de la table référencée au singulier avec underscore et id : `article_id`, on a rien d'autre à faire.  
Si vous voulez nommer vos clés étrangères différemment, il faudra le spécifier dans les méthodes `belongsTo` et `hasMany()`. La documentation est là pour ça.

##### Testons le résultat de ces méthodes dans `tinker` :
On peut maintenant ramener les relations ainsi : 
```php
$user = User::where('id', 1)->with('articles')->get();
```
On peut se servir des méthodes `articles` ou `comments` comme d'une propriété de `User` :
```php
$user = User::first();
$user->articles;
$user->comments;
```
C'est valable aussi dans le sens inverse :
```php
$article = Article::first();
$article->user;
$article->comments;

$comment = Comment::first();
$comment->article;
$comment->user;
```
On peut aussi les exécuter de façon classique :
```php
$article = Article::first();
$article->user()->get();
$article->comments()->get();
```

#### hasOne
Nous avons des utilisateurs dans notre BDD, une page de profil affichera leurs informations et ils pourront les éditer. Un utilisateur ne peut avoir qu'un profil, spécifions le dès maintenant :
`User.php`
```php
public function profile()
{
    return $this->hasOne(Profile::class);
}
```
À vous de créer la classe `Profile`, et d'y mettre sa relation par rapport à l'utilisateur.
On y met rien d'autre pour l'instant, il nous manque quelques notions plus complexes pour coder ça proprement.
---
Avec tout ce qu'on a vu depuis le début, on est prêt à faire évoluer notre application.
Votre premier exercice pratique vous attend.

