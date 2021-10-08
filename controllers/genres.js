const express = require('express')
const {Genre} = require('../db')

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real

function list(req, res, next) {
    Genre.findAll({include:['movies']})
        .then(objects => res.json(objects));
}
function index(req, res, next){
    const id= req.params.id;
    Genre.findByPk(id)
        .then(object => res.json(object));
    //res.send(`Genre del sistema con un id =  ${req.params.id}`)
}
function create(req, res, next){
    const description = req.body.description;
    const status = req.body.status;

    let genre = new Object({
        description:description,
        status:status
    });
    Genre.create(genre)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

    //res.send(`crear un Genre nuevo con nombre ${description} y apellido ${status}`)
}
function replace(req, res, next){
    const id = req.params.id;
    Genre.findByPk(id)
        .then(object => {
            const description = req.body.description ? req.body.description:object.description
            const status = req.body.status ? req.body.status: req.body.status
            object.update({description:description, status:status})
                .then(Genre => res.json(Genre))
        })
}
function edit(req, res, next){
    const id = req.params.id;
    Genre.findByPk(id)
        .then(object => {
            const description = req.body.description ? req.body.description:object.description
            const status = req.body.status ? req.body.status:object.status
            object.update({description:description, status:status})
                .then(Genre => res.json(Genre))
        })
}
function destroy(req, res, next){
    const id = req.params.id;
    Genre.destroy({where:{id:id} })
        .then(obj => res.json(obj));
}

module.exports = {
    list, index, create, replace, edit, destroy
}