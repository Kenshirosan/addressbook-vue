# Advanced Eloquent Relationships

 ## Many-to-many
Dans un blog, les articles sont couramment associés à une catégorie, mais aussi à des 'tags'.
Supposons que nous ayons des catégories d'article, l'une d'elle est la programmation.
Si cet article est à propos de JavaScript et de PHP, on voudrait y associer les tags PHP et JavaScript.

Comme d'habitude, on se pose quelques questions :
- Un article peut-il être associé avec un ou plusieurs tags ?
- Un tag peut-il être associé avec un où plusieurs articles ?   

Un tag peut être associé à plusieurs articles et vice-versa.

Voyons comment implémenter ce type de relation `many-to-many` avec `eloquent`.

Pour associer les tags aux articles, en plus de la table qui contiendra les tags, on aura besoin d'une table pivot. Cette table contiendra l'id des posts et des tags. Sa clé primaire sera une association de ces deux champs.
```bash 
php artisan make:migration create_tags_table
```
Voici le contenu de ce fichier :
```php
public function up()
{
    Schema::create('tags', function (Blueprint $table) {
        $table->id();
        $table->string('name')->unique();
        $table->timestamps();
    });

    Schema::create('article_tag', function (Blueprint $table) {
        $table->foreignId('article_id');
        $table->foreignId('tag_id');
        $table->primary(['article_id', 'tag_id']);

        $table->foreign('article_id')->references('id')->on('articles')->onDelete('cascade');
        $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
    });
}

/**
 * Reverse the migrations.
 *
 * @return void
 */
public function down()
{
    Schema::dropIfExists('tags');
    Schema::dropIfExists('article_tag');
}
```
On crée les deux tables dont on a besoin dans ce même fichier.  
Le nom `article_tag` n'est pas choisi au hasard, c'est le nom des deux tables associées au singulier et dans l'ordre alphabétique. Le framework s'en servira plus tard pour automatiser les choses.  
On doit maintenant définir les relations dans nos modèles `Tag` et ` Article`.
```bash
php artisan make:model Tag
```
Voici le contenu du fichier :
```php
protected $fillable = ['name'];

public function articles()
{
    return $this->belongsToMany(Article::class);
}
```
Dans la méthode `articles()`, on passe un deuxième argument à la méthode `belongsToMany()` pour dire au framework sur quelle table on ira chercher la clé étrangère.

Un article peut être associé à plusieurs tags, un tag peut aussi être associé à plusieurs articles, on doit donc définir la relation dans l'autre sens dans la classe `Article` :
```php
public function tags()
{
    return $this->belongsToMany(Tag::class);
}
```
Grâce aux conventions, on n'a pas besoin de spécifier notre table pivot. Tout sera automatique

Enfin, dans le modèle `Article`, voici une méthode qui vous permettra d'associer un tag avec un article :
```php
public function tag($tag)
{
    return $this->tags()->attach($tag);
}
```
On appelle la méthode `attach()` directement sur la relation `tags()` qu'on a avant, le reste sera automatique.

Maintenant, à vous d'expérimenter avec `tinker`, et de vérifier si tout fonctionne comme attendu.

Enfin, on a une méthode `attach()` pour associer les posts, on doit sûrement avoir une méthode `detach()`.

> Ce sera à vous de jouer pour implémenter le système qui permettra d'associer les tags avec les articles dans une interface web.

> Quand on teste nos requêtes avec `tinker`, parfois les résultats ne sont pas ce que l'on attend car la ressource a été mise en cache,
> dans ce cas vous devrez vous servir de la méthode `fresh` ainsi : 
```php
$article = $article->fresh();
```
> Vous obtiendrez une copie 'fraîche' de la resource.
