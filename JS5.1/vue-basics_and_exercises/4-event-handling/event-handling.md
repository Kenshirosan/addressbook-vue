# Event Handling

Etudions maintenant les event listeners :
Tous les event listeners disponibles en JavaScript sont disponibles dans Vue.js, après tout, Vue.js c'est du JavaScript.

Débutons par voir le 'submit' :
PLusieurs syntaxes sont disponibles: `@submit` et `v-on:submit`
On l'ajout simplement à un formulaire et on y ajoute le modificateur `.prevent` pour empêcher le comportement par défaut de formulaire.
On ajoute aussi le v-model au champs du formulaires.
```html
                <!-- le @submit.prevent pour e.preventDefault() -->
<form action="" @submit.prevent="createContact">
    <label for="name">Name</label> 
        <input type="text" v-model="name" id="name"> 
    <label for="email">Email</label> 
        <input type="email" v-model="email" id="email"> 
    <label for="phone">Phone</label> 
        <input type="tel" v-model="phone" id="phone"> 
    <button type="submit">Submit</button>
</form>
```

On a donc écrit `@submit.prevent="createContact"`, ce qui signifie que nous allons appeler la méthode `createContact()` quand on envoie le formulaire.

Ecrivons maintenant notre objet data et la méthode `createContact()`, à l'aide de l'objet methods de Vue.js.

```javascript
new Vue({ 
    el: '#app', 

    data: {
        name: '',
        email: '',
        phone: ''
    },
    
    // L'objet methods permet d'écrire des fonctions, ces fonctions sont locales dans le contexte d'un 'component'
    methods: { 
        createContact() { 
            const contact = { 
                name: this.name, 
                email: this.email, 
                phone: this.phone,
            }; 
            console.log(contact); 
        }, 
    }, 
});
```
Et c'est tout. Grâce au data object, au v-model et au two-way data binding, les propriétés correspondantes se mettront automatiquement à jour avec la valeur qu'auront les champs du formulaire. Dès qu'on va envoyer le formulaire, le contact sera crée sans qu'on est rien d'autre à faire.


Interceptons maintenant les events sur d'autres éléments.

```html
<button @click="doSomething">Cliquer</button> 
    <!--    le .prevent pour un lien-->
<a @click.prevent="intercept" href="test.php">Lien quelconque</a>
```

On ajoute nos fonctions `doSomething()` et `intercept()` en les séparant par des virguless, et c'est tout. 
La simplicité est remarquable.

```javascript
new Vue({ 
    el: '#app', components: { HeaderTemplate, FooterTemplate }, 
    // On pourrait utiliser le shorthand pour l'objet data...
    data: data, 
    // L'objet methods permet d'écrire des fonctions 
    // Ces fonctions sont locales dans le contexte d'un 'component' 
    methods: { 
        createContact() { 
            const contact = { 
                name: this.name, 
                email: this.email, 
                phone: this.phone,
            }; 
            console.log(contact); 
        }, 
        
        doSomething() { 
            console.log('bouton clique'); 
        }, 
        
        interceptEvent() { 
            console.log('clique a href'); 
        }, 
    }, 
});
```
