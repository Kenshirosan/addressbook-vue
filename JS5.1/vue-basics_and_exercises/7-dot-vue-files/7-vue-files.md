# L'extension .vue

Jusqu'à maintenant, nous avons tout codé dans un seul fichier, ce qui n'est évidemment pas l'idéal.

Vue offre la possibilité de travailler avec des fichiers dédiés, avec une extension .vue.

Pour développer proprement et efficacement avec Vue.js, vous allez devoir travailler avec des fichier .vue. L'avantage d'un fichier .vue pour un composant est qu'on peut le réutiliser ou on veut, dans n'importe quelle application, il suffira d'enregister le composant

On code ici avec plusieurs librairies qui s'occuperont de la compilation des fichiers .vue en JavaScript. Vous aurez donc quelques lignes commandes à retenir

Le fichier package.json fourni sert à installer les librairies avec la commande
```bash 
npm install
```
Quand ce script a été exécuté, la commande suivante va récupérer les fichiers JS et .vue situé dans le dossier src et les compiler en un seul fichier JS lisible par un navigateur :
```bash 
npm run build
```
Enfin la dernière commande permettra de démarrer un serveur dont la racine est le répertoire dist, chaque modification apporté à un fichier .vue sera automatiquement pris en compte et compilé, vous n'aurez pas a rafraîchir le navigateur.
```bash 
npm run dev
```
Voici quelques schémas pour décrire la page que vous êtes en train de lire :

![app arch](./dist/img/app.png)  
![app arch](./dist/img/main.png)  
![app arch](./dist/img/index.png) 

Un fichier .vue est structuré par deux éléments requis :  `<template> ` et `<script>` et un tag `<style>` optionnel.  
**_Important : Dans le tag template, un seul élément racine doit être présent._**, Par exemple, si le composant contient deux `<ul>`, elles devront être entourées par une balise `div`, si le composant ne contient qu'une `<ul>`, on peut le laisser ainsi.  
Voici la syntaxe d'un composant dans un fichier .vue
```html
<template>
    <div>
        <p>Votre template</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //
            }
        },
        computed : {
            //
        },
        methods: {
            //
        }
    }
</script>
<!-- balise style facultative, l'attribut scoped optionnel est équivalent à une ID.
    Le style sera appliqué uniquement au template de ce fichier -->
<style scoped>
    .container {
        margin: auto;
    }
</style>
```
