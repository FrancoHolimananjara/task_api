module.exports = (sequelize,DataTypes)=>{
    const Collection = sequelize.define('User' , {
        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        pseudo: {
            type:DataTypes.STRING,
            allowNull:false
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false
        },
        mdp: {
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamp:true,
        freezeTableName:true
    })

    User.associate = function (models) {
        User.hasMany(models.Collection , {
            foreignKey : {
                name :'userId',
                allowNull:false
            }
        })
    }

    return User;
}