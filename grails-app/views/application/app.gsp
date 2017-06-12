<!doctype html>
<html>
<head>
    <title>Applications</title>
    <meta name="layout" content="main"/>

    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />
</head>
<body>
<div id="message">
    <div v-if="type">
        <div v-if="type === 'ERROR'">
            <div v-for="error in message" class="error">
                {{ error.message }}
            </div>

        </div>
        <div v-if="type === 'MESSAGE'">
            {{ message }}
        </div>
    </div>
</div>

<div id="app-comp">
    <button @click="create" v-show="view === 'list'"><g:message code="default.button.create.label"/> </button>
    <input-component v-show="view === 'page'"></input-component>
    <list-component v-show="view === 'list'"></list-component>
</div>

<script type="text/x-template" id="list-component">
<div>
    <table>
        <thead>
        <tr>
            <th><g:message code="application.code.label"/></th>
            <th><g:message code="application.name.label"/></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="application in applications" @click="load(application.id)">
            <td>{{ application.code }}</td>
            <td>{{ application.name }}</td>
        </tr>
        </tbody>
    </table>
    <button @click="refresh"><g:message code="default.button.refresh.label"/></button>
</div>
</script>

<%-- si on peut tt mettre dans un template gsp --%>
<script type="text/x-template" id="input-component">
<div>
    <div>id : <input ref="id" v-model="application.id" type="number"></div>
    <div>code : <input v-model="application.code"></div>
    <div>nom : <input v-model="application.name"></div>
    <button @click="save"><g:message code="default.button.create.label"/></button>
    <button @click="newApp"><g:message code="default.new.label" args="${message(code: 'application.label')}"/></button>
</div>
</script>
<asset:javascript src="app.js"/>
</body>
</html>