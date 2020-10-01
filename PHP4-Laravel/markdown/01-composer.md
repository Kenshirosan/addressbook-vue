# Composer

## Qu'est-ce que composer ?
[composer](https://getcomposer.org/) est le gestionnaire de librairie standard du moment pour PHP.

## À quoi ça sert ?
C'est l'outil en ligne de commande qui nous permet d'installer des librairies et plus.

Suivez ce [lien](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos) pour débuter et votre formateur vous guidera pour l'installation.

## Utilisation basique

Trois commandes sont très souvent utilisées, en voici deux :
La première pour télécharger une librairie dans le cadre d'un projet spécifique :
```bash
composer require nom/librairie
```

La deuxième pour installer une librairie globalement sur notre OS :
```bash
composer global require nom/librairie
```
L'utilisation du mot-clé `global` est la différence, on utilisera cette commande pour installer un framework.

## Installation de librairies avec composer.json
La troisième commande est utilisée dans le cas ou on souhaite installer manuellement nos librairies à l'aide d'un fichier de configuration `composer.json`
```json
{
    "require": {
        "stripe/stripe-php": "^7.28",
        "intervention/image": "^2.4"
    }
}
```
Cet exemple est pour l'installation de la librairie stripe, un fournisseur de solution de paiement en ligne, et d'une librairie très connue qui permet de gérer les images.
Une fois qu'on a écrit ce qu'on veut comme librairies ou framework dans ce fichier, on tape la commande
```bash
composer install
```
Composer installe les librairies et nous fournit un autoloader dans le fichier `vendor/autoload.php` que l'on inclut dans notre fichier principal et qui nous évitent des lignes de `require`
Quand vous clonerez une application depuis github ou autre service de ce type, cette dernière commande sera utilisée.
