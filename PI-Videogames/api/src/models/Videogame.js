const { UUIDV4, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
function* IDS() {
  _default = 500
  while (true) {
    yield _default += 1
  }
}
module.exports = (sequelize) => {
  const IDMkr = IDS()
  const { INTEGER, STRING, DATE } = DataTypes;
  // defino el modelo
  sequelize.define('pokemon', self = {
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
      unique: true,
      // validate: {
      //   notNull: {
      //     msg: "El campo no puede ser nulo"
      //   },
      //   isAlpha: {
      //     args: true,
      //     msg: "El nombre solo puede contener letras"
      //   },
      //   len: {
      //     args: [2, 25],
      //     msg: "El nombre tiene que ser entre 3 y 25 caracteres"
      //   }
      // },
    },
    description: {
      type: INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: DATE,
      allowNull: true,
    },
    rating: {
      type: INTEGER,
      allowNull: true,
    },
    plataform: {
      type: INTEGER,
      allowNull: FALSE,
    }
  });
};
