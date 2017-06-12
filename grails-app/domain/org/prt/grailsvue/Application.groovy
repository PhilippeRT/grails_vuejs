package org.prt.grailsvue

import grails.rest.Resource

@Resource(uri="/applications")
class Application {

    static constraints = {
    }
    String code
    String name

}
