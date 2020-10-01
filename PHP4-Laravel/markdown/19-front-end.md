# Front End

### Les bases
Un fichier package.json est fourni avec laravel, celui-ci contient déjà quelque 'scripts' et des librairies que vous pouvez installer, dont laravel-mix, qui permet de compiler les fichiers CSS et JS.
```bash
npm install
```
Les librairies sont installées, comment ça marche ?
Dans le dossier `resources`, on a un dossier `css` et un dossier `js`.
Commençons par le dossier `js`, deux fichiers sont présents, dans le fichier `bootstrap.js` on a un peu code 'boilerplate', la ligne 11 sert à configurer axios pour pouvoir effectuer des requêtes ajax avec le `csrf token` .  
Le fichier `app.js` servira à importer nos différents modules et c'est ce fichier qui sera compilé. Le fichier compilé se trouvera ici : `public/js/app.js`

Ce sera exactement la même chose pour le CSS. 
> Vous devrez coder votre CSS dans le dossier `resources/css` et votre JS dans le dossier `resources/js`

Pour compiler quand on développe, on tape la commande
```bash
npm run dev
```
Pour monitorer les fichiers automatiquement (compilation à chaque changement dans un fichier) : 
```bash
npm run watch
```
Et en production :
```bash
npm run prod
```
Cette dernière commande compilera et compressera les fichiers.

Dans le fichier `master.blade.php`, on référencera ces fichiers ainsi :
```html
<script src="/css/app.css"></script>
<script src="/js/app.js"></script>
```
ou ainsi :
```html
<script src="{{ mix('/css/app.css') }}"></script>
<script src="{{ mix('/js/app.js') }}"></script>
```
ou encore : 
```html
<script src="{{ asset('/css/app.css') }}"></script>
<script src="{{ asset('/js/app.js') }}"></script>
```
La deuxième méthode permet de versionner le script, ainsi, s'il est mis en cache, il se rechargera automatiquement quand on le modifie.   
Si on veut modifier le chemin par défaut, on le fait dans le fichier de configuration de laravel-mix `webpack.mix.js`.  
Laravel-mix est une librairie qui simplifie considérablement le travail avec webpack, on peut se servir de cette librairie dans d'autres projets que laravel.
Nous n'irons pas plus loin que ces bases, étant donné la facilité et la documentation.

Nous préférons vous montrer 'jetstream', une librairie bien plus évolué. laravel-mix est présent de toute façon pour la compilation.

---

### Laravel Jetstream

Avant de débuter avec Jetstream, on va devoir effacer quelques fichiers qu'on a codés précédemment.
On efface le dossier `Http/Controllers/Auth` et le dossier `resources/views/auth`.  
Vous pouvez aussi renommer les fichiers, pour les garder pour référence.
Effacez ou commentez aussi les routes en rapport (`login`, `logout`,`register`).

> Laravel Jetstream vient avec tout un système d'authentification prêt à l'emploi, nous n'avons plus besoin de ces fichiers.
> Il était toutefois important de comprendre comment l'authentification fonctionne avant d'automatiser les choses.

Laravel vient avec tout une série de paquets qui permettent d'intégrer des librairies JavaScript et de travailler avec les CSS.
Installons un tout nouveau paquet qui est sorti en septembre 2020 avec Laravel 8.
Pour les versions précédentes, le paquet s'appelait `laravel/ui`, très facile à prendre en main, vous pourrez vous documenter et n'aurez aucune difficulté à comprendre son fonctionnement.

Installez Jetstream :
```bash
composer require laravel/jetstream
php artisan jetstream:install inertia
```
Jetstream va installer plusieurs librairies dont : [Vue.js](https://vuejs.org/), [inertia](https://inertiajs.com/), et [tailwind CSS](https://tailwindcss.com/)
Des composants `Vue.js` et seront déjà écrits pour nous, ainsi que tout un système d'authentification, des vues, des migrations, et mettra à jour le fichier `package.json`.
Un dossier `app/Actions` a aussi été créé, il contient le système d'authentification.

Quand l'installation est faite, on installe et compile nos fichiers :
```bash
npm install && npm run dev
```

Nous allons vous montrer les bases afin que vous puissiez écrire votre javascript et votre CSS, pour approfondir, comme d'habitude, la [documentation](https://jetstream.laravel.com/) est complète.

Commençons par examiner le fichier `web.php` et la route qui a été ajoutée :
```php
Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia\Inertia::render('Dashboard');
})->name('dashboard');
```
On fait appel à la librairie 'inertia' qui va s'occuper de transmettre les requêtes a Vue.js, s'il y a des données, celles-ci sont transmises automatiquement.  
Démarrer le serveur de l'application et naviguez sur cette route.  
On rencontre une erreur, on a oublié la commande `php artisan migrate`.

Vous pouvez constater que la librairie a créé les vues et les routes `/login` et `/register`, ainsi que les routes etc etc..

Identifiez-vous et naviguez sur les différentes pages de notre profil automatiquement créé.  
Ce choix d'implémenter un tel système a été dicté par le fait que c'est quelque chose que l'on doit faire en permanence en tant que développeur.  
On peut tout à fait utiliser ce système tel quel, néanmoins on préfèrera (vos employeurs) le customiser. C'est donc une très bonne base pour commencer à travailler.

Explorez aussi le dossier `resources/js` qui a été mis à jour, et qui comporte toutes les vues du 'dashboard'.

#### Jetstream : Les bases
Modifions notre application pour la faire fonctionner avec jetstream.
Jetstream va nous servir a 'transformer' notre application, les vues seront rendues en javascript, laravel ne s'occupera que du backend.   
Dans le dossier `resources/views`, un fichier `app.blade.php` a été crée, c'est celui-ci qui va nous permettre de travailler avec jetstream.
Reprenons `PagesController` et modifions la première méthode :
```php
public function index()
{
    return Inertia::render('Master');
}
```
Retournons sur la page d'accueil, on a une erreur : on n'a pas importé inertia :
```php
use Inertia\Inertia;

class PagesController extends Controller
{
    public function index()
    {
        return Inertia::render('Master');
    }
}
```
Dans le terminal :
```bash
npm run watch
```
On recommence et on a encore une erreur, on n'a pas de fichiers `Master`.  
Dans le dossier `js/Pages`, créer cette vue, c'est un fichier `.vue`, et mettez-y les liens que nous avons actuellement dans le fichier `master.blade.php`.
Cette fois c'est bon, on peut voir nos liens.
À vous de jouer pour convertir la vue qui nous affiche la liste des articles.
> Vous aurez besoin des 'props' de `vue.js` ...

##### CSS
Pour le CSS, rien de plus simple, le framework [tailwind](https://tailwindcss.com/) a été installé, vous pouvez donc ajouter les classes de ce framework directement dans les templates `vue`.  
Vous pouvez aussi éditer le fichier `resources/css/app.css` et écrire votre propre CSS.
Tapez la commande suivante :
```bash
npm run watch
```
Chaque modification du fichier sera prise en compte automatiquement.

Si vous n'utilisez pas jetstream :  
> N'oubliez pas d'inclure vos fichiers compilé ainsi dans le fichier `app.blade.php` :
```html
<script src="{{ mix('/css/app.css') }}"></script>
<script src="{{ mix('/js/app.js') }}"></script>
```
Si vous utilisez jetstream, le fichier `app.blade.php` contient déjà tout ce qu'il faut.

> Cette introduction à jetstream peut paraître déroutante et compliqué, ça fait beaucoup de choses à retenir avec laravel :  
> **Ne vous laisser pas impressionner, tout va devenir très clair en peu de temps.**

##### Note sur le framework `tailwind` :
> Un fichier de configuration de ce framework est disponible `tailwind.config.css`
> Avec le temps vous pourrez apprendre à configurer tailwind à votre goût.
