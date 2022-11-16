module.exports = (sequlize,DataTypes)=>{
    const Task = sequlize.define('Task' , {
        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        nom: {
            type:DataTypes.STRING,
            allowNull:false
        },
        description: {
            type:DataTypes.STRING
        }
    },{
        timestamp:true,
        freezeTableName:true
    })

    Task.associate = function (models) {
        Task.belongsTo(models.Collection , {foreignKey:'collectionId'})
    }

    return Task;
}