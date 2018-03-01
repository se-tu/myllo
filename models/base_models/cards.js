/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cards', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(512),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(512),
			allowNull: true
		},
		position: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		listId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'lists',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'cards'
	});
};
