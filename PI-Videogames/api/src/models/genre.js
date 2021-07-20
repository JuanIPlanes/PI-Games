const { UUIDV4, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
function* IDS() {
    _default = 200 //! Initial base of the default local IDs
    while (true) {
        yield _default += 1
    }
}
module.exports = (sequelize) => {
    const IDMkr = IDS()
    const { INTEGER, STRING } = DataTypes;
    // defino el modelo
    sequelize.define('genre', self = {
        id: {
            type: INTEGER,
            defaultValue: () => {
                return IDMkr.next().value
            },
            primaryKey: true
        },
        name: {
            type: STRING,
            allowNull: false,
            unique: true
        }
    });
};

