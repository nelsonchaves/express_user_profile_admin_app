'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-01-23T07:20:12.292Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "UserId": {
                "type": Sequelize.INTEGER(11),
                "field": "UserId",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "FirstName": {
                "type": Sequelize.STRING(45),
                "field": "FirstName",
                "allowNull": true
            },
            "LastName": {
                "type": Sequelize.STRING(45),
                "field": "LastName",
                "allowNull": true
            },
            "Username": {
                "type": Sequelize.STRING(45),
                "field": "Username",
                "unique": true,
                "allowNull": true
            },
            "Password": {
                "type": Sequelize.STRING,
                "field": "Password",
                "allowNull": true
            },
            "Email": {
                "type": Sequelize.STRING(45),
                "field": "Email",
                "unique": true,
                "allowNull": true
            },
            "Admin": {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "defaultValue": "0",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATEONLY,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATEONLY,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
