'use strict';
module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define('districts', {
        districtName: {
            type: DataTypes.STRING,
            required: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        underscored: true,
        tableName: 'districts'
    });
    District.associate = function (models) {
        // associations can be defined here
        District.hasOne(models.child_details, {
            as: 'childDeatils',
            foreignKey: 'district_id',
            constraints: true
        })

        District.belongsTo(models.states, {
            as: 'state',
            foreignKey: 'state_id',
            constraints: true
        })
    };
    return District;
};