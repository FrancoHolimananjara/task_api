module.exports = (sequelize,DataTypes)=>{
    const Collection = sequelize.define('Collection' , {
        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        nom: {
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamp:true,
        freezeTableName:true
    })

    Collection.associate = function (models) {
        Collection.hasMany(models.Task , {
            foreignKey : {
                name :'collectionId',
                allowNull:false
            }
        })
    }

    return Collection;
}