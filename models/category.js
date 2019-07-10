module.exports = function(sequelize, Sequelize) {
    var CategorySchema = sequelize.define('Category', {
        id:{
			type:Sequelize.INTEGER(11),
			autoIncrement:true,
			primaryKey: true
		},
		name:{
			type:Sequelize.STRING(255)
		}
    },{
        timestamps: false
	});
    return CategorySchema;
}