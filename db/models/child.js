'use strict';
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('child_details', {
        name: {
            type: DataTypes.STRING,
            required: true
        },
        sex: {
            type: DataTypes.STRING
        },
        dob: {
            type: DataTypes.DATE,
            required: true,
        },
        fatherName: {
            type: DataTypes.STRING,
            required: true
        },
        motherName: {
            type: DataTypes.STRING,
            required: true
        },
        photo: {
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
        tableName: 'child_details'
    });
    Child.associate = function (models) {
        // associations can be defined here
        Child.belongsTo(models.states, {
            as: 'district',
            foreignKey: 'district_id',
            constraints: true
        })
    };
    return Child;
};