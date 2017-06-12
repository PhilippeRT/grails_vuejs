package grails_vuejs

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "/applications.app"(view: "/application/app")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
