module.exports = function(sequelize, Sequelize) {
    var UserSchema = sequelize.define('User', {
        id:{
			type:Sequelize.INTEGER(11),
			autoIncrement:true,
			primaryKey: true
		},
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
        address2: Sequelize.STRING,
        zipcode: Sequelize.INTEGER,
        city: Sequelize.STRING,
        state_id: Sequelize.INTEGER,        
        country_id: Sequelize.INTEGER,
        is_deleted: Sequelize.BOOLEAN,
        image: {
            type: Sequelize.STRING(255)
        }
    },{
        timestamps: true
    });
	UserSchema.associate = function (models) {
        UserSchema.belongsTo(models.Country, {
                as: 'contries',
                foreignKey: {
                    name: 'country_id',
                    allowNull: true
                }
        });

        UserSchema.belongsTo(models.State, {
            as: 'states',
            foreignKey: {
                name: 'state_id',
                allowNull: true
            }
        });    
    }
    
    return UserSchema;
}
