const express = require('express')
const {Actor} = require('../db');

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real

function list(req, res, next) {
    Actor.findAll({include:['movies']})
        .then(objects => res.json(objects));
}
function index(req, res, next){
    const id= req.params.id;
    Actor.findByPk(id)
        .then(object => res.json(object));
    //res.send(`director del sistema con un id =  ${req.params.id}`)
}
function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Object({
        name:name,
        lastName:lastName
    });
    Actor.create(actor)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

    //res.send(`crear un director nuevo con nombre ${name} y apellido ${lastName}`)
}
function replace(req, res, next){
    const id = req.params.id;
    Actor.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name:object.name
            const lastName = req.body.lastName ? req.body.lastName:""
            object.update({name:name, lastName:lastName})
                .then(actor => res.json(actor))
        })
}
function edit(req, res, next){
    const id = req.params.id;
    Actor.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name:object.name
            const lastName = req.body.lastName ? req.body.lastName:object.lastName
            object.update({name:name, lastName:lastName})
                .then(actor => res.json(actor))
        })
}
function destroy(req, res, next){
    const id = req.params.id;
    Actor.destroy({where:{id:id} })
        .then(obj => res.json(obj));
}

module.exports = {
    list, index, create, replace, edit, destroy
}