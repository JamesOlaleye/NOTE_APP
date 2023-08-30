"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Note extends sequelize_1.Model {
}
exports.Note = Note;
Note.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    Title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    DueDate: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: db_config_1.default,
    tableName: 'Notes',
});
// User.hasMany(Note, { foreignKey: 'userId', as: 'NOTES' });
// Note.belongsTo(User, { foreignKey: 'userId', as: 'NOTES' });
