# Introduction aux props:

Les props sont des propriétés que l'on passe à un composant à l'endroit où on se sert du composant. Il peut avoir n'importe quelle valeur, des images d'un slider par exemple
```vue
<slider-component :images="images"></slider-component>
```
On le récupère dans le fichier .vue :
```vue
<template>
    <div>
       <div class="slider">              <!-- on se sert d'un 'props' ici -->
            <img v-for="image in images" :src="image" class="slider-item">
        </div>
    </div>
</template>
<script>
    export default {
        // Déclarer les props ici
        // Un props est 'read-only' dans ce composant
        props: ['images'],
        data() {
            return {
                sliderImages: ''
            }
        },
        // méthode appelée automatiquement au chargement du composant
        mounted() {
            this.sliderImages = this.$props.images; // on y accède par this.$props
        }
    }
</script>
```
On ne doit / peut pas modifier un props directement dans le composant dans lequel il est déclaré.  
On doit le modifier dans l'élément parent. Il est possible de le faire, mais c'est une grande source de problèmes, et Vue affiche un warning à ce propos dans la console quand on essaye.  
Dans l'exemple ci-dessus, si le tag `<slider-component>` est inclus dans un fichier PHP, la modification du `props` devra se faire dans ce fichier.

## Note à propos des slot
Les slots sont d'autres aides très utiles que fournit Vue.js, à ce stade de la formation, nous estimons que vous devez parcourir la [documentation](https://vuejs.org/v2/guide/components-slots.html) vous-même. Les slots étant très facile à comprendre.

