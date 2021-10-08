const express = require('express')
const {Copy} = require('../db')

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real

function list(req, res, next) {
    Copy.findAll({include:['bookings', 'movies']})
        .then(objects => res.json(objects));
}
function index(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then(object => res.json(object));
    //res.send(`Copy del sistema con un id =  ${req.params.id}`)
}
function create(req, res, next){
    const number = req.body.number;
    const format = req.body.format;
    const estatus = req.body.estatus;
    const movieId = req.body.movieId;

    let copy = new Object({
        number:number,
        format:format,
        estatus:estatus,
        movieId:movieId
    });
    Copy.create(copy)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}
function replace(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name:""
            const format = req.body.format ? req.body.format:req.body.format
            const estatus = req.body.estatus ? req.body.estatus:req.body.estatus
            object.update({name:name, format:format, estatus:estatus})
                .then(copy => res.json(copy))
        })
}
function edit(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name:object.name
            const format = req.body.format ? req.body.format:object.format
            const estatus = req.body.estatus ? req.body.estatus:object.estatus
            object.update({name:name, format:format, estatus:estatus})
                .then(copy => res.json(copy))
        })
}
function destroy(req, res, next){
    const id = req.params.id;
    Copy.destroy({where:{id:id} })
        .then(obj => res.json(obj));
}

module.exports = {
    list, index, create, replace, edit, destroy
}