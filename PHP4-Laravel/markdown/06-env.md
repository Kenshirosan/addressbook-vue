# Le fichier .env

Chaque installation de laravel contient un fichier `.env` où on définit des variables d'environnement et de configuration du framework.  
**!! Ce fichier ne devra jamais être inclus dans vos repos !!** en raison des informations sensible qu'il peut contenir.  
Ci-dessous, la reproduction d'une partie de ce fichier avec des commentaires explicatifs :
```
APP_NAME=Laravel # Le nom de l'application
APP_ENV=local # sécurité : spécifie si on est en local ou en production
APP_KEY=base64:Cg1VflIhgKGXmSBdxJCOpwL2ef8apesUPte91bug6x8= # clé servant à chiffrer les données
APP_DEBUG=true # Est on en train de débugguer ?
APP_URL=http://localhost

# La section ci-dessous se passe de commentaires.
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
Lorsque vous clonerez une application laravel, assurez-vous que le fichier `.env.example` est présent et renommer le `.env`, puis exécuter la commande suivante pour générer la clé de l'application, sans celle-ci, rien ne fonctionnera
```bash
php artisan key:generate
```

#### En cas de problèmes avec un application clonée :
Parfois, mais pas souvent 🤷, les développeurs commettent des erreurs et pendant le développement, ils mettent leur configuration en cache et on se retrouve avec sur l'application qu'on a cloné, résultat rien ne marche sans qu'on ne comprenne bien pourquoi.
Les commandes suivantes pourront vous aider :
```bash
php artisan cache:clear
php artisan config:clear
```
Un problème assez courant aussi vient des permissions sur les fichiers et dossiers, dans ce cas, on remet les permissions de laravel par défaut :
```bash
sudo find /path/to/your/laravel-directory -type f -exec chmod 644 {} \; # permissions des fichiers
sudo find /path/to/your/laravel-directory -type d -exec chmod 755 {} \; # permissions des dossiers
```
Dans le cas ou vous avez configuré un serveur apache et que vous en vous servez pas du serveur laravel, il vous faudra donner accès en écriture au serveur :
```bash
sudo chown -R my-user:www-data /path/to/your/laravel-directory
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```
__N'oubliez pas de remplacer les champs nécessaires, par vos noms d'utilisateurs et de serveur.__  
Avec ces commandes, votre utilisateur est 'propriétaire' du contenu du dossier de l'application et le serveur à un accès en écriture aux dossiers et fichiers dont il a besoin.  
**Cette configuration est valable pour un serveur de développement seulement**
