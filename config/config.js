export default {
  database: 'devlab',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'devlab.sqlite',
    define: {
      underscored: true,
    },
  },
  jwtSession: { session: false },
}
