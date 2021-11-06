const path = require('path')

const pathViews = function (nameView) {
    return path.resolve(__dirname, ("../views/webs/" + nameView + ".ejs"))
}

const controller = {

    // Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.

    showHome : function (req, res) {
        res.render(pathViews("index"))
    },
    
}

module.exports = controller;