const express = require('express')
const {Movie, Actor} = require('../db');

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real

function list(req, res, next) {
    Movie.findAll({include:['genre', 'director', 'actors']})
        .then(objects => res.json(objects));
}
function index(req, res, next){
    const id = req.params.id;
    Movie.findByPk(id)
        .then(object => res.json(object));
    //res.send(`Movie del sistema con un id =  ${req.params.id}`)
}
function addActor(req, res, next){
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(idMovie).then((movie) => {
        Actor.findByPk(idActor).then((actor) => {
            movie.addActor(actor);
            res.json(movie);
        });
    });
}

function create(req, res, next){
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let movie = new Object({
        title:title,
        genreId:genreId,
        directorId:directorId
    });
    Movie.create(movie)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

    //res.send(`crear un Movie nuevo con nombre ${name} y apellido ${lastName}`)
}
function replace(req, res, next){
    
}
function edit(req, res, next){
    
}
function destroy(req, res, next){
    const id = req.params.id;
    Movie.destroy({where:{id:id} })
        .then(obj => res.json(obj));
}

module.exports = {
    list, index, create, replace, edit, destroy, addActor
}