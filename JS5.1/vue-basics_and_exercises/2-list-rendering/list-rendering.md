# Rendu de tableaux et objets avec Vue.js

#### Comment gérer les boucles avec Vue.js ? 

##### Rendu d'un tableau dans une liste :

Ajoutons un tableau à notre data object

```javascript
data() { 
    return { 
        arr: ['item', 'item 1', 'item2'],
    }; 
}
```

Et on tourne autour avec la directive v-for of

```html
<ul>
    <!-- On extrait chaque element 'item' du tableau 'arr   -->
    <li v-for="item of arr">{{ item }}</li>
</ul>
```

##### Rendu d'un objet dans une table :

On ajoute un objet :

```javascript
data() { 
    return { 
        obj: { name: 'John Doe', phone: '06-06-06-06-06' }, 
    }; 
}
```

Et on utilise la directive v-for in :

```html
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Phone</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <!-- On extrait chaque propriétés 'item' de l'objet 'obj'   -->
            <td v-for="item in obj">{{ item }}</td>
        </tr>
    </tbody>
</table>
```

Encore une fois très simple.

##### Rendu d'un tableau composé d'objets dans une table :

On ajoute les données :

```javascript
data() { 
    return { 
         arrOfObj: [ 
            { name: 'John Doe', phone: '06-06-06-06-06' }, 
            { name: 'Jane Doe', phone: '07-07-07-07-07' }, 
            { name: 'Jack Doe', phone: '08-08-08-08-08' }, 
        ], 
    }; 
}
```

On met une directive v-or of pour extraire les objets du tableau, suivi d'une directive v-for in pour les objets :

```html
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Phone</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="items of arrayOfObj">
            <td v-for="item in items">{{ item }}</td>
        </tr>
    </tbody>
</table>
```

Le script complet :
    
```javascript
 new Vue({ 
    el: '#app',
    
    data() { 
        return { 
            arr: ['item', 'item 1', 'item2'], 
            obj: { name: 'John Doe', phone: '06-06-06-06-06' }, 
            arrOfObj: [ 
                { name: 'John Doe', phone: '06-06-06-06-06' }, 
                { name: 'Jane Doe', phone: '07-07-07-07-07' }, 
                { name: 'Jack Doe', phone: '08-08-08-08-08' }, 
            ], 
        }; 
    }, 
 });
 ```
