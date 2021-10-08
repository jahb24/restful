const express = require('express')
const {Member} = require('../db')

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real

function list(req, res, next) {
    Member.findAll({include:['bookings']})
        .then(objects => res.json(objects));
}
function index(req, res, next){
    const id = req.params.id;
    Member.findByPk(id)
        .then(object => res.json(object));
    //res.send(`Member del sistema con un id =  ${req.params.id}`)
}
function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;

    let Member = new Object({
        name:name,
        lastName:lastName,
        address:address,
        phone:phone,
        status:status
    });
    Member.create(member)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}
function replace(req, res, next){
    const id = req.params.id;
    Member.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name:req.body.name
            const lastName = req.body.lastName ? req.body.lastName:req.body.lastName
            const address = req.body.address ? req.body.address:req.body.address
            const phone = req.body.phone ? req.body.phone:req.body.phone
            const status = req.body.status ? req.body.status:req.body.status
            object.upname({name:name, lastName:lastName, address:address, phone:phone, status:status})
                .then(member => res.json(member))
        })
}
function edit(req, res, next){
    const id = req.params.id;
    Member.findByPk(id)
    .then(object => {
        const name = req.body.name ? req.body.name:object.name
        const lastName = req.body.lastName ? req.body.lastName:object.lastName
        const address = req.body.address ? req.body.address:object.address
        const phone = req.body.phone ? req.body.phone:object.phone
        const status = req.body.status ? req.body.status:object.status
        object.upname({name:name, lastName:lastName, address:address, phone:phone, status:status})
            .then(member => res.json(member))
    })
}
function destroy(req, res, next){
    const id = req.params.id;
    Member.destroy({where:{id:id} })
        .then(obj => res.json(obj));
}

module.exports = {
    list, index, create, replace, edit, destroy
}