module.exports = (sequelize, type) => {
    const Director = sequelize.define('director', {
        id:{type:type.INTEGER, primaryKey:true, autoIncrement:true},
        name:type.STRING,
        lastName:type.STRING
    });
    return Director;
};
//en la página de sequelize.org se pueden ver los tipos de datos