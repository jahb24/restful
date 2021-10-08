const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movieActor');
const copyModel = require('./models/copy');
const bookingModel = require('./models/booking');
const memberModel = require('./models/member');

// 1) db name 2) user 3) password 4) obj conf
const sequelize = new Sequelize('video-club', 'root', 'abcd1234', {
    host:'localhost', //dirección de nuestro RDBMS
    dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);

//un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'movies'});

//una pelicula puede tener un genero
Movie.belongsTo(Genre, {as:'genre'});

//un director puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'});

//una pelicula puede tener un director
Movie.belongsTo(Director, {as:'director'});

//un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey:'movieId'});
//una pelicula tiene muchos actores
MovieActor.belongsTo(Actor, {foreignKey:'actorId'});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'moviesActors'
})
Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'moviesActors'
})

//una pelicula puede tener muchas copias
Movie.hasMany(Copy, {as:'copies'});

//una copia puede tener una pelicula
Copy.belongsTo(Movie, {as:'movies'});

//una copia puede tener muchas reservaciones
Copy.hasMany(Booking, {as:'bookings'});

//una reservación puede tener una copia
Booking.belongsTo(Copy, {as:'copies'});

//un miembro puede tener muchas reservaciones
Member.hasMany(Booking, {as:'bookings'});

//una reservación puede tener un miembro
Booking.belongsTo(Member, {as:'members'});

//borra todo y genera nuevas tablas
sequelize.sync({
    force:true
}).then(()=>{
    console.log("base de datos actualizada");
});

module.exports = {Director, Genre, Movie, Actor, MovieActor, Copy, Booking, Member}