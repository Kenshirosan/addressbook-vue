# Middleware guest et auth

Un middleware est une classe qui va se situer entre une route et un contrôleur, qui va intercepter la requête et effectuer des vérifications.


Commençons par deux middlewares très utilisé et qui nous sont fournis.
Nous écrirons un middleware plus tard.
 
 Commençons par protéger les routes qu'on ne veut pas rendre accessible à tous le monde.
 Pour l'instant on cache les liens avec les directives blade, mais les routes sont toujours accessibles.
 
 On veut donc interdire l'accès aux routes suivantes :
 `profile`, `create/article`, `/edit/article`, `/edit/article`, `/register`, `/login` et `/logout` 
```php
Route::get('/articles/create', [ArticlesController::class, 'create'])->middleware('auth');
Route::post('/articles/create', [ArticlesController::class, 'store'])->middleware('auth');

Route::get('/article/{article}/edit', [ArticlesController::class, 'edit'])->middleware('auth');
Route::patch('/article/{article}/edit', [ArticlesController::class, 'update'])->middleware('auth');
Route::delete('article/{article}/delete', [ArticlesController::class, 'delete'])->middleware('auth');

// Auth
Route::get('/register', [RegisterController::class, 'index'])->name('register')->middleware('guest');
Route::post('/register', [RegisterController::class, 'create'])->middleware('guest');
Route::get('/login', [SessionsController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [SessionsController::class, 'authenticate'])->middleware('guest');
Route::post('/logout', [SessionsController::class, 'logout'])->name('logout')->middleware('auth');
// profile
Route::get('/profile', [UserController::class, 'index'])->name('profile')->middleware('auth');
```
Maintenant vous pouvez essayer d'accéder aux routes concernées, vous serez automatiquement redirigé vers la page de login si vous êtes `guest` ou vers une page spécifiée dans le fichier `app/Providers/RouteServiceProvider.php` : la constante `HOME`, si vous êtes `auth`.

Si vous êtes `auth` et que vous essayez de toucher à la route `/register` ou `/login`, vous serez redirigé vers la page d'accueil.

> On peut également créer un constructeur dans le contrôleur concerné pour utiliser un middleware.
Exemple dans `ArticlesController` : 
```php
public function __construct()
{
    $this->middleware('auth')->except('index', 'show');
}
```
En procédant ainsi, on bloque l'accès à toutes les méthodes sauf celles qui nous permettent de lire les articles.
