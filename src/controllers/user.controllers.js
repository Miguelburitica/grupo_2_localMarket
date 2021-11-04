const path = require('path')

// const pathViews = function (nameView) {
//     return "../views/" + nameView + ".ejs"
// }

// Meli, cuando termines de cambiar las extensiones de las views, descomenta la función de arriba y borra la de abajo.

const pathViews = function (nameView) {
    return path.resolve(__dirname, ("../views/" + nameView + ".html"))
}

const controller = {

    // Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.

    showLogin : function (req, res) {
        res.sendFile(pathViews("login"));
    },

    showSignIn : function (req, res) {
        res.sendFile(pathViews("sign-in"));
    }

}

module.exports = controller;