import bcrypt from 'bcrypt'

export default (sequelize, DataType) => {
  const Users = sequelize.define(
    'Users', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: {
            msg: 'O nome só pode conter letras',
          },
        },
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: {
            msg: 'O formato do email não está correto!',
          },
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastAccess: {
        type: DataType.DATE,
        allowNull: true,
      },
      privateKey: {
        type: DataType.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync()
          user.set('password', bcrypt.hashSync(user.password, salt))
          user.set('lastAccess', new Date())
          user.set('privateKey', bcrypt.hashSync(user.email, salt))
        },
      },
      classMethods: {
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
      },
    }, 
  )
  return Users
}
