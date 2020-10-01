# Correction du premier exercice

#### Le contrôleur
Dans la méthode `index()`
```php
$articles = Article::with('user')->orderBy('created_at', 'desc')->get();

return view('layouts.articles', compact('articles'));
```
#### La vue `layouts/articles.blade.php`
```blade
<h2>Articles</h2>
{{-- Peu importe la boucle utilisée. --}}
@each('articles.index', $articles, 'article', 'articles.no-articles')
```
#### La vue partiel `articles/index.blade.php`
```blade
<article>
    <h3>Article écrit par {{ $article->user->name }}</h3>
    <a href="/article/{{ $article->id }}">
        <p>{{ $article['title'] }}</p>
    </a>
</article>
``` 
