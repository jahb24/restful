const express = require('express')

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real

function list(req, res, next) {
    res.send('Lista de usuarios del sistema');
}
function index(req, res, next){
    res.send(`usuario del sistema con un id =  ${req.params.id}`)
}
function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    res.send(`crear un usuario nuevo con nombre ${name} y apellido ${lastName}`)
}
function replace(req, res, next){
    res. send(`reemplazo un usuario con id = ${req.params.id} por otro`)
}
function edit(req, res, next){
    res. send(`reemplazo las propiedades de un usuario con id = ${req.params.id} por otras`)
}
function destroy(req, res, next){
    res. send(`elimino un usuario con id = ${req.params.id}`)
}

module.exports = {
    list, index, create, replace, edit, destroy
}