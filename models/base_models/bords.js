/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bords', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ownerId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
    title: {
      type: DataTypes.STRING(512),
      allowNull: false
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
		tableName: 'bords'
	});
};
