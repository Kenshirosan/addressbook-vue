<template>
    <div>
        <header-component></header-component>

        <div class="container">
            <h1>
                L'extension .vue
            </h1>
            <p>
                Jusqu'à maintenant, nous avons tout codé dans un seul fichier,
                ce qui n'est évidemment pas l'idéal.
            </p>
            <p>
                Vue offre la possibilité de travailler avec des fichiers dédiés,
                avec une extension .vue.
            </p>
            <p>
                Pour développer proprement et efficacement avec Vue.js, vous
                allez devoir travailler avec des fichier .vue. L'avantage d'un
                fichier .vue pour un composant est qu'on peut le réutiliser ou
                on veut, dans n'importe quelle application, il suffira
                d'enregister le composant
            </p>
            <p>
                On code ici avec plusieurs librairies qui s'occuperont de la
                compilation des fichiers .vue en JavaScript. Vous aurez donc
                quelques lignes commandes à retenir
            </p>
            <p>
                Le fichier package.json fourni sert à installer les librairies
                avec la commande
            </p>
            <pre><code class="hljs bash">npm install</code></pre>
            <p>
                Quand ce script a été exécuté, la commande suivante va récupérer
                les fichiers JS et .vue situé dans le dossier src et les
                compiler en un seul fichier JS lisible par un navigateur :
            </p>
            <pre><code class="hljs bash">npm run build</code></pre>
            <p>
                Enfin la dernière commande permettra de démarrer un serveur dont
                la racine est le répertoire dist, chaque modification apporté à
                un fichier .vue sera automatiquement pris en compte et compilé,
                vous n'aurez pas a rafraîchir le navigateur.
            </p>
            <pre><code class="hljs shell">npm run dev</code></pre>
            <p>
                Voici quelques schémas pour décrire la page que êtes en train de
                lire :
            </p>
            <img src="/img/app.png" alt="app arch" />
            <img src="/img/main.png" alt="app arch" />
            <img src="/img/index.png" alt="app arch" />
            <p>Voici la syntaxe d'un composant dans un fichier .vue</p>
            <pre><!--
--><code class="hljs html"><!--
-->&lt;template>
    &lt;div>
        &lt;p>Votre template&lt;/p>
    &lt;/div>
&lt;/template>
&lt;script>
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
&lt;/script>
&lt;!-- balise style facultative, l'attribut scoped optionnel est équivalent à une ID.
    Le style sera appliqué uniquement au template de ce fichier -->
&lt;style scoped>
    .container {
        margin: auto;
    }
&lt;/style>
</code></pre>
            <h3>Introduction aux props:</h3>
            Les props sont des propriétés que l'on passe à un composant à
            l'endroit où on se sert du composant. Il peut avoir n'importe quelle
            valeur, des images d'un slider par exemple
            <pre><code class="htjs html">&lt;slider-component :images="<?= $images ?>">&lt;/slider-component></code></pre>
            <p>On le récupère dans le fichier .vue :</p>
            <pre><code class="hljs html"><!--
-->&lt;template>
    &lt;div>
        &lt;div class="slider">
            &lt;img v-for="image in images" :src="image" class="slider-item">
        &lt;/div>
    &lt;/div>
&lt;/template>
&lt;script>
    export default {
        // Déclarer les props ici
        props: ['images'],
        data() {
            return {
                sliderImages: ''
            }
        },
        // méthode appelé automatiquement au chargement du composant
        mounted() {
            this.sliderImages = this.$props.images; // on y accède par this.$props
        }
    }
&lt;/script>
</code></pre>
        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
    import HeaderComponent from './components/HeaderComponent.vue';
    import FooterComponent from './components/FooterComponent.vue';
    import TestComponent from './components/TestComponent.vue';
    export default {
        name: 'App',
        components: { HeaderComponent, TestComponent, FooterComponent },
    };
</script>
