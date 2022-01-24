module.exports = (sequelize, DataTypes) => {
    return sequelize.define("place",
    {
        pk: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        name: {
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        coordinates: {
            type:DataTypes.GEOMETRY('POINT'),
            allowNull:false,
        }
    }
    )
}