module.exports = function(sequelize, Sequelize) {
    var CountrySchema = sequelize.define('Country', {
        id:{
			type:Sequelize.INTEGER(11),
			autoIncrement:true,
			primaryKey: true
		},
		name:{
			type:Sequelize.STRING(255)
		}
    },{
        timestamps: true
	});
    return CountrySchema;
}