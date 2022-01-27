module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "drop",
        {
            pk: {
                type:DataTypes.INTEGER,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true,
            },
            content: {
                type:DataTypes.TEXT,
                allowNull:false,
            },
            latitude: {
                type:DataTypes.FLOAT,
                allowNull:false,
            },
            longitude:{
                type:DataTypes.FLOAT,
                allowNull:false,
            }
        }
    )
}