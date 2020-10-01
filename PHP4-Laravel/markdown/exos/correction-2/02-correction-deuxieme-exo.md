# Correction

`Article.php`
```php
protected $appends = [
    'author', 'comments'
];

public function getCommentsAttribute()
 {
     return $this->comments()->with('user')->get();
 }
```
`ArticlesController@show`
```php
public function show(Article $article)
{
    return view('articles.show', compact('article'));
}
```
