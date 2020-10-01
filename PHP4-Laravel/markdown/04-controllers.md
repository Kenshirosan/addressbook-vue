# Les contrôleurs

Jusqu'à maintenant, nous avons mis dans nos routes les fonctions permettant de nous afficher les pages.  
Si on a plusieurs pages statiques, il nous faudra donc autant de routes avec callback, et le fichier va devenir très vite pollué.  
Nous travaillons avec un framework MVC, profitons-en pour modifier la structure de notre petite application.  
Utilisons les contrôleurs, qui analyserons nos requêtes et articuleront l'application comme un chef d'orchestre.  
Commençons par créer un contrôleur, ouvrez un terminal et tapez la commande suivante :
```bash
php artisan make:controller PagesController     
```
Nous venons de créer un contrôleur nommé `PagesController`, dans le dossier `app/Http/Controllers`  
Dans ce fichier, laravel a déjà mis la structure de base du contrôleur.  
On peut tout à fait créer ce contrôleur à la main, si vous faites ça, n'oubliez pas de taper ensuite la commande suivante :
```bash
composer dump-autoload
```  
Cette commande dira au framework de recharger toutes les classes, et donc d'ajouter la nouvelle.  

Ajoutons les méthodes qui vont nous retourner les pages statiques de notre application :
```php
class PagesController extends Controller
{
    public function index()
    {
        return view('layouts.master');
    }
    
    public function contact()
    {
        return view('layouts.contact');
    }
}
```
Ce code se passe de commentaires, la méthode `view()` ira chercher automatiquement les fichiers  

Dans le fichier `web.php`, modifions les routes pour utiliser les contrôleurs :
Dans ce cours, nous allons utiliser laravel 8, mais nous avons choisi de vous montrer également la syntaxe pour les applications tournant sous les versions de laravel avant celle-ci.  
Jusqu'à `laravel 7` :
```php
Route::get('/', 'PagesController@index');
Route::get('/contact-us', 'PagesController@contact');
```
On passe en deuxième argument le nom du contrôleur et la méthode qu'on veut appeler séparé par le `@`.  
Nous utiliserons la syntaxe suivante :  
`laravel 8`
```php
use App\Http\Controllers\PagesController;

Route::get('/', [PagesController::class, 'index']);
Route::get('/contact-us', [PagesController::class, 'contact']);
```
Ce contrôleur vous servira à ajouter les pages statiques de l'application et c'est tout.

À vous maintenant d'ajouter une page `about`.
il vous faudra :
- Un lien HTML
- Une route
- Une méthode dans le contrôleur
- Et une vue
