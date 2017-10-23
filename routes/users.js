import UsersController from '../controllers/user'

export default (app) => {
  const usersController = new UsersController(app.datasource.models.Users)
  app.route('/api/signup')
    .post((req, res) => {
      usersController.create(req.body)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
}
