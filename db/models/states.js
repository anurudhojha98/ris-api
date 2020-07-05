'use strict';
module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define('states', {
        stateName: {
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
        tableName: 'states'
    });
    State.associate = function (models) {
        // associations can be defined here
        State.hasMany(models.districts, {
            as: 'districts',
            foreignKey: 'state_id',
            constraints: true
        })
    };
    return State;
};