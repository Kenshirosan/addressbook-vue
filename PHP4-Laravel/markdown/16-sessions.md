# Laravel Sessions

Jusqu'à maintenant, on a simulé un utilisateur pour enregistrer des articles mais on a aucun moyen d'identifier les utilisateurs et donc de vérifier les permissions.
Travailler avec les sessions dans laravel est très simple.  
- Dans le dossier `views`, vous allez créer un dossier `auth` et deux vues : `register.blade.php` et `login.blade.php`.
- Puis créez deux contrôleurs :
```bash
php artisan make:controller Auth/SessionsController && php artisan make:controller Auth/RegisterController
```
Ces commandes créeront les contrôleurs dans le dossier `app/Controllers/Auth`.

Ensuite on crée deux routes : 
```php
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::get('/login', [SessionsController::class, 'index'])->name('login');
```
N'oubliez pas d'importer vos contrôleurs. `use ...`.  
On en profite pour vous montrez la méthode `name('name')` qu'on enchaîne avec `Route::` sur  qui permet de nommer les routes et de les référencer dans les templates de cette manière :
```blade
<a href="{{ route('login') }}">Login</a>
```
Cette méthode est très pratique, si on change une url, on n'a pas à aller chercher et modifier dans tous les templates où on a utilisé un lien, tout est automatique.

Ce sera à vous de créer les formulaires :
- Dans un dossier `views/auth`, une vue `register.blade.php` et `login.blade.php`
- Le formulaire `register` aura pour action `/register` :
  - Il comporte quatre champs : `name`, `email`, `password`, `password_confirmation`.
- Le formulaire `login` aura pour action `/login` :
  - Il comporte deux champs : `email` et `password`.
  
N'oubliez pas de gérer les erreurs éventuelles ni les `method` dans les tags HTML `form`.
Enfin ajoutez les liens des routes dans la vue `master` et retournez ces vues avec les contrôleurs.
N'oubliez pas non plus d'ajouter les routes correspondantes aux méthodes et actions des formulaires. 

### RegisterController

Dans ce contrôleur qui va nous servir à créer des comptes utilisateurs, plusieurs choses sont nécessaires pour que tout fonctionne.
 
On ajoute au contrôleur les classes et méthodes nécessaires :
```php
<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function index()
    {
        return view('auth.register');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|string|email|max:255|unique:users',
            'name' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     */
    protected function create(Request $request)
    {
        $this->validator($request->all());

        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        $user = User::where('email', $request['email'])->firstOrFail();
        Auth::login($user);
        session()->flash('success_message', 'Votre compte a été crée');
    
        return redirect('/');
    }

}
```  
Dans ce contrôleur, on valide les données du formulaire, on enregistre l'utilisateur, on le 'login' automatiquement grâce à la façade `Auth`, enfin on envoie un message si tout s'est bien passé.
> Notez cette deuxième méthode pour envoyer un message de session. `session()->flash()`.
> Ainsi que la méthode `redirect()`.

L'utilisateur est enregistré et authentifié, modifions les vues pour refléter tout ça.
Avec blade des directives sont disponibles pour nous aider.
`master.blade.php`
```blade
@guest
    <a href="{{ route('register') }}">Créer un compte</a>
    <a href="{{ route('login') }}">Login</a>
@endguest
```
Ces directives rendront les liens invisibles si l'utilisateur est authentifié.  
On crée un lien vers un profil (et une route), profil que nous n'avons pas, ainsi qu'un formulaire `logout` :
```blade
@auth
    <a href="{{ route('profile') }}">Votre profil</a>
    <form action="{{ route('logout') }}" method="POST">
        <input type="submit" value="Se déconnecter">
    </form>
@endauth
```
Ce lien ne sera visible que si l'utilisateur est authentifié.
```php
Route::get('/profile', [UserController::class, 'index'])->name('profile');
```
Enfin on crée le contrôleur : 
```bash
php artisan make:controller UserController -m User
```
On passe l'option `-m User` pour spécifier le modèle qu'on veut gérer avec ce contrôleur. Celui-ci contiendra déjà les méthodes CRUD, à vous de voir si elles vous serviront ou pas.

> **Nous n'irons pas plus loin avec le profil utilisateur : le modèle, les relations `eloquent`, le contrôleur et la route sont tous présents, il ne manque que la migration.   
> À vous de développer ce que vous voudrez.** 

### SessionsController
Voyons maintenant les méthodes pour les actions de `login` et `logout`.
Pour le login, rien de plus simple, la méthode est fournie dans la documentation du framework :
```php
/**
 * Handle an authentication attempt.
 *
 * @param  \Illuminate\Http\Request $request
 *
 * @return Response
 */
public function authenticate(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        // Authentication passed...
        return redirect()->intended('/');
    }
}
```
Cette méthode se lit simplement, on essaye de valider email et mot de passe, si ça marche on redirige l'utilisateur où celui-ci voulait aller, ou à une page passée en argument à la méthode `intended`.  
Si ça ne marche pas, on recevra automatiquement les messages d'erreurs.  
Difficile de faire plus simple.

Enfin l'action logout :
```php
public function logout()
{
    Auth::logout();

    return redirect('/');
}
```
Encore une fois, ça se passe de commentaires.
