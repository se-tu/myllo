/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lists', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		header: {
			type: DataTypes.STRING(512),
			allowNull: false
		},
		position: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		bordId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'bords',
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
		tableName: 'lists'
	});
};
