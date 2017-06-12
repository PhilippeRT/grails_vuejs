# grails_vuejs

Le but de ce petit projet est de monter une application Grails avec un front end [Vue.js](http://vuejs.org)
Pour cela, on fera un domaine Application qui sera simplement une resource.
Pour la visualisation, on fera 2 composants :
- un composant de liste
- un composant de saisie

La vue sera appelée avec l'url /applications.app qui pointera sur applications/app.gsp.
Le fichier app.js contient le script et les composants, alors que les templates sont dans app.gsp pour pouvoir utiliser l'i18n de grails.
On fait une transmission simpliste de messages entre composants par l'intermédiaire un composant vide EventBus.
Trop cool avec vue.js : dès qu'un compisant est monté, on peut lui envoyer un message. Ainsi, l'initialisation se fait par message.

ATTENTION :
- bootstrap.js ne semble pas compatible avec vue.js : les évènements vue ne sont pas transmis.
- on utilise les fonctions flêchées : non compatibles avec I.E. De plus, il faut un navigateur compatible ECMAScript 6.



