import HttpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import AuthController from '../controllers/auth'

export default (app) => {
  const Users = app.datasource.models.Users
  const authController = new AuthController(app.datasource.models.Users)   

  app.route('/api/isauthenticate',)
    .all(app.auth.authenticate())
    .get((req, res) => {
      res.json({message:"Usuário está autorizado!"})
      
    })
    
  app.route('/api/logout',)
    .all(app.auth.authenticate())
    .post((req, res) => {
       Users.update({privateKey:''}, { where: { id: req.body.id } })
            .then(user => {
                res.json({
                  message: 'logout feito com sucesso!',
                })
            })
            .catch( err => err)
    })

  app.post('/api/authenticate', (req, res) => {
        authController.authenticate(req, res)

  })
}
