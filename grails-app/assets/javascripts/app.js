/**
 * Created by prt on 02/06/17.
 */

//= require jquery-2.2.0.min.js
//= require vue.js

/*
 * LOG
 * composant de saisie
 * composant de liste : la liste sera chargée au démarrage
 * composant de liste : la liste sera rafraichie sur un évenènement de refresh
 * composant de liste : quand on clique sur un élément de liste, on charge l'application dans le composant de saisie
 * composant de saisie avec un template dans le gsp afin de récupérer les chaînes pour l'internationalisation
 * composant de liste distinct
 */
// Comme on va faire passer des messages entre composants, on fait un bus
// Les composants n'auront plus qu'à écouter les messages
var eventBus = new Vue({
})

/**
 * 
 * @type {Vue}
 * 
 * gestion des messages utilisateur
 * on a 2 types de message : ERROR et MESSAGE
 * le type ERROR correspond à l'évènement error, les données associées seront le tableau des erreurs grails
 * le type MESSAGE correspond à l'évènement message, les données seront une chaine à afficher
 *
 */
var msgManager = new Vue({
    el: '#message',
    data: {
        type: '',
        message: Object
    },
    mounted() {
        eventBus.$on('message', (data) => {
            this.type = 'MESSAGE'
            this.message = data
            })
        eventBus.$on('error', (data) => {
            this.type = 'ERROR'
            this.message = data
        })
    }
})


/**
 * 
 * @type {{template: string, data: InputComponent.data, mounted: InputComponent.mounted, methods: {save: InputComponent.methods.save, newApp: InputComponent.methods.newApp}}}
 * 
 * Composant de saisie
 *
 */
var InputComponent = {
    template: "#input-component",
    data: function () {
        return {
            application: {
                id: 0,
                code: '',
                name: ''
            }
        }
    },
    mounted: function () {
        eventBus.$on('load', (id) => {
            console.log('chargement de ' + id)
        $.ajax({
                contentType: "application/json",
                url: "/applications/" + id,
                error: (textStatus) => {
                eventBus.$emit('error', 'Erreur au chargement de ' + id)
    },
        success: (data) => {
            this.application = data
        }
    })
    })
    },
    methods: {
        save: function () {
            console.log('save: ' + JSON.stringify(this.application))
                $.ajax({
                        method: this.application.id === 0 ? "POST" : "PUT",
                        contentType: "application/json",
                        url: "/applications" + (this.application.id === 0 ? "" : "/" + this.application.id),
                        data: JSON.stringify({id: this.application.id, code: this.application.code, name: this.application.name, codeApp: this.application.codeApp}),
                        // pour accéder aux data, soit il faut binder this, soit on utilise les fonctions flêchées (ne fonctionne pas ss IE)
                        error: (textStatus) => {
                        // on émet une erreur
                        console.log(textStatus)
            eventBus.$emit('error', textStatus.responseJSON.errors)
        },
            success: (data) => {
                // met à jour le composant
                this.application.id = data.id
                // informe l'utilisateur que l'enregistrement est créé
                eventBus.$emit('message', 'enregistré')
                // demande à rafraîchir la liste
                eventBus.$emit('refresh')
            }
        })
        },
        newApp: function () {
            this.application = {id: 0, code: '', name: '', codeApp: 0}
        }
    }
}

/**
 *
 * @type {{template: string, data: ListComponent.data, methods: {load: ListComponent.methods.load, refresh: ListComponent.methods.refresh}, mounted: ListComponent.mounted}}
 *
 * gestion de la liste
 */
var ListComponent = {
    template: "#list-component",
    data: function() {
        return { applications: [] }
    },
    methods: {
        load: function (id) {
            console.log('demande de chargement de ' + id)
            eventBus.$emit('load', id)
        },
        refresh: function () {
            console.log('emit refresh')
            eventBus.$emit('refresh')
        }
    },
    // chargement au démarrage
    mounted: function() {
        console.log('component mounted')
        // si on demande un rafraichissement de la liste
        eventBus.$on('refresh',  () => {
            $.ajax({
                method: "GET",
                contentType: "application/json",
                url: "/applications",
                error: (textStatus) => {
                eventBus.$emit('error', textStatus.responseText)
            },
                success: (data) => {
                    console.log('loaded')
                    console.log(data)
                    this.applications = data
                }
            })
    })
    }
}

/**
 *
 * @type {Vue}
 *
 * Application complète
 */
var appComp = new Vue({
    el: '#app-comp',
    data: {
        view: 'list'
    },
    components: {
        'inputComponent': InputComponent,
        'listComponent': ListComponent
    },
    methods: {
        create: function() {
            this.view = 'page'
        }
    },
    // au montage, on charge les données et on met en place le comportement
    // si on fait un refresh -> affichage de la liste
    // si on charge un enregistrement -> affichage de la page
    mounted: function () {
        eventBus.$emit('refresh')
        eventBus.$on('load', () => {
            this.view = 'page'
    })
        eventBus.$on('refresh', () => {
            this.view = 'list'
    })
    }
})
