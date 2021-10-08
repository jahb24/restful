module.exports = (sequelize, type) => {
    const Copy = sequelize.define('copies', {
        id:{type:type.INTEGER, primaryKey:true, autoIncrement:true},
        number:type.STRING,
        format:type.STRING,
        estatus:type.STRING
    });
    return Copy;
};