module.exports = function(sequelize, Sequelize) {
    var AlbumSchema = sequelize.define('Photo', {
        id:{
			type:Sequelize.INTEGER(11),
			autoIncrement:true,
			primaryKey: true
		},
		name:{
			type:Sequelize.STRING(255)
        },
        url:{
			type:Sequelize.STRING(255)
        },
        thumUrl:{
			type:Sequelize.STRING(255)
        },
        album_id: Sequelize.INTEGER,
    },{
        timestamps: true
    });
    
    AlbumSchema.associate = function (models) {
        AlbumSchema.belongsTo(models.Album, {
                as: 'albums',
                foreignKey: {
                    name: 'album_id',
                    allowNull: true
                }
        });
	}
    return AlbumSchema;
}