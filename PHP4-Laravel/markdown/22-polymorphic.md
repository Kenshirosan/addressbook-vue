# Advanced Eloquent Relationships

## Polymorphic Relationship
 
Les relations polymorphiques sont rendus très simple avec laravel.
 
Comment définir si une relation est polymorphique ?
 
Prenons exemple avec des `likes`.  
On peut liker un article, on aura besoin d'un table `like`, et avec les clés étrangères, on va enregistrer nos données pour associer un like à un article. Jusqu'ici, tout va bien.
Mais maintenant, on a besoin d'avoir un bouton like pour les commentaires, ainsi que pour les vidéos.  
Comment procéder ? Est-ce qu'on va créer des tables `likeVideo` et `likeComment` ? avec tout ce que cela implique ? et potentiellement, chaque fois qu'on veut rajouter un bouton like sur une resource, on va encore créer des tables ?

---
> Dans ces cas, la solution est la relation polymorphique. Cette relation va permettre d'associer différentes resources avec nos likes, nos likes ne sont donc pas spécifique à une resource.
---
Derrière ce nom barbare se cache une technique très simple qui permet de réaliser ce qu'on veut avec nos likes, sans avoir à créer à chaque fois des tables différentes.

Il va nous suffire de définir nos relations, et ensuite d'enregistrer les id et le type de resources qu'on souhaite `liker`.

---
Pour une personne, quand on l'aime bien dans la vie, on dit qu'elle est aimable. C'est un trait de sa personnalité, la personne est aimable.
Concernant nos resources, c'est exactement pareil, on va donc créer un trait `Likeable` que nos resources vont exploiter, ainsi qu'une migration.
```php
php artisan make:migration create_likeables_table
```
Voici le contenu de cette migration :
```php
public function up()
    {
        Schema::create('likeables', function (Blueprint $table) {
            $table->foreignId('user_id');
//            $table->foreignId('likeable_id');
//            $table->string('likeable_type');
            $table->morphs('likeable');
            $table->timestamps();
            $table->primary(['user_id', 'likeable_id', 'likeable_type']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
```
> La méthode `morphs` va créer les champs likeable_id et likeable_type  
> La clé primaire est un composite des champs likeable_id, user_id et likeable_type. Ainsi on s'assure de ne pas pouvoir enregistrer plusieurs fois la même chose.

Dans le dossier `app`, créez un dossier `Traits` et le fichier `Likeable.php`.
C'est ce trait qui définira les relations `eloquent`.
```php
<?php

namespace App\Traits;

use App\Models\User;

trait Likeable
{
    public function likes()
    {
        return $this->morphToMany(User::class, 'likeable')->withTimestamps();
    }

    public function like($user = null)
    {
        $user = $user?: auth()->user();

        return $this->likes()->attach($user);
    }

}

```
- La première méthode définie la relation par rapport à l'utilisateur, et le nom des champs que laravel soit rechercher (`likeable_id` et `likeable_type`).
  - On enchaîne la méthode `withTimestamps` pour spécifier qu'on veut enregistrer des données dans les champs `created_at` et `updated_at`.
- La deuxième méthode sert à enregistrer les données. On vérifie si on passe un utilisateur, auquel cas c'est celui-ci qui sera pris en compte, sinon ce sera l'utilisateur authentifié.
- À vous de créer la méthode `dislike`.

Ensuite on doit dire à nos modèles d'utiliser le trait : 
Les modèles utilisent déjà le trait `hasFactory` par défaut, on utilise le nôtre de la même manière :
```php
<?php

class Article extends Model
{
    use HasFactory; use Likeable;
    // ...
}
```
On pourra dorénavant 'liker' toutes les resources qu'on voudra.

Il nous reste à définir la relation inverse, afin de pouvoir récupérer un utilisateur avec tous ces likes, classées par resources : 
```php
public function likedPosts()
{
    return $this->morphedByMany(Article::class, 'likeable');
}

public function likedComments()
{
    return $this->morphedByMany(Comment::class, 'likeable');
}
```
Vous pourrez éventuellement créer une méthode voir une classe `Like` pour récupérer tous les likes.
