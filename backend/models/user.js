module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User",
    {
        pk: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        nickname: {
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        email: {
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
        }
    }, {
        freezeTableName:true
    }
    )
}