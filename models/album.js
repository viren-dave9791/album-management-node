module.exports = function(sequelize, Sequelize) {
    var AlbumSchema = sequelize.define('Album', {
        id:{
			type:Sequelize.INTEGER(11),
			autoIncrement:true,
			primaryKey: true
		},
		name:{
			type:Sequelize.STRING(255)
        },
        user_id: Sequelize.INTEGER,
    },{
        timestamps: true
    });
    
    AlbumSchema.associate = function (models) {
        AlbumSchema.belongsTo(models.User, {
                as: 'users',
                foreignKey: {
                    name: 'user_id',
                    allowNull: true
                }
        });
	}
    return AlbumSchema;
}