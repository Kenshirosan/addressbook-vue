# Directives v-if, v-else et v-else-if

Equivalent de if, else if, else.
Voici un exemple de code JavaScript, toujours l'objet data :
```javascript
new Vue({
    el: '#app',
    components: { HeaderTemplate, FooterTemplate },
    data: {
        persons: [
            { name: 'John Doe', age: 18 },
            { name: 'Jack Doe', age: 30 },
            { name: 'Jane Doe', age: 45 },
        ],
    },
});
```

Et voici le template HTML
```html
<ul>
    <li v-for="person in persons" v-if="person.age === 18">
        {{ person.name }}
    </li>
    <li v-else-if="person.age > 10 && person.age < 35">
        {{ person.name }}
    </li>
    <li v-else>
        {{ person.name }}
    </li>
</ul>
```

_A ce stade de la formation, nous estimons que nous n'avons pas besoin de fournir des explications à propose de ces directives._
