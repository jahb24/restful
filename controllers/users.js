const express = require('express')

//restfull => get, post, put, patch, delete
//modelo = estructura de datos que representa una entidad de mundo real
function list(req, res, next) {
    const n1 = req.body.n1;
    const n2 = req.body.n2;
    const suma = n1 + n2;
    res.send(`la suma de ${n1} y ${n2} es ${suma}`);
}
function index(req, res, next){
    res.send(`usuario del sistema con un id = ${req.params.id}`)
}
function create(req, res, next){
    const n1 = req.body.n1;
    const n2 = req.body.n2;
    const multi = n1 * n2;
    res.send(`la multiplicacion de ${n1} y ${n2} es ${multi}`)
}
function replace(req, res, next){
    const n1 = req.body.n1;
    const n2 = req.body.n2;
    const division = n1 / n2;
    res. send(`la division de ${n1} y ${n2} es ${division}`)
}
function edit(req, res, next){
    const n1 = req.body.n1;
    const n2 = req.body.n2;
    const potencia = Math.pow(n1, n2);
    res. send(`${n1} elevado a ${n2} es ${potencia}`)
}
function destroy(req, res, next){
    const n1 = req.body.n1;
    const n2 = req.body.n2;
    const resta = n1 - n2;
    res. send(`la resta de ${n1} y ${n2} es ${resta}`)
}


module.exports = {
    list, index, create, replace, edit, destroy
}