module.exports = function(sequelize, Sequelize) {
    var BookSchema = sequelize.define('Book', {
        title: Sequelize.STRING,
        author: Sequelize.STRING,
        category: Sequelize.INTEGER,
        type: {
            type: Sequelize.ENUM('Digital','Print')
        },
        image: {
            type: Sequelize.STRING(255)
        }
    },{
        timestamps: false
    });
	BookSchema.associate = function (models) {
            BookSchema.belongsTo(models.Category, {
                as: 'categories',
                foreignKey: {
                    name: 'category',
                    allowNull: true
                }
            });
	}
    return BookSchema;
}
