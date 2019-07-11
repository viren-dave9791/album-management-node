module.exports = function(sequelize, Sequelize) {
    var StateSchema = sequelize.define('State', {
        id:{
			type:Sequelize.INTEGER(11),
			autoIncrement:true,
			primaryKey: true
		},
		name:{
			type:Sequelize.STRING(255)
        },
        country_id: Sequelize.INTEGER,
    },{
        timestamps: true
    });
    
    StateSchema.associate = function (models) {
        StateSchema.belongsTo(models.Country, {
                as: 'countries',
                foreignKey: {
                    name: 'country_id',
                    allowNull: true
                }
        });
	}
    return StateSchema;
}