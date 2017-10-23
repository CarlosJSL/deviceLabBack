import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'

let database = null

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models')
  const models = []
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file)
    const model = sequelize.import(modelDir)
    models[model.name] = model
  })
  return models
}

export default function (app) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  const sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    define: {
      underscored: true,
    },
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: false,
    dialectOptions: {
        ssl: true
    }
});
    database = {
      sequelize,
      Sequelize,
      models: {},
    }

    database.models = loadModels(sequelize)

    sequelize.sync().done(() => database)
  }
  return database
}
