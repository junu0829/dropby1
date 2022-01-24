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
            coordinates: {
                type:DataTypes.GEOMETRY('POINT'),
                allowNull:false,
            }
        }
    )
}