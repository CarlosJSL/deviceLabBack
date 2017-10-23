import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  message,
}, statusCode)

class UsersController {
  constructor(Users) {
    this.Users = Users
  }

  create(data) {
    return this.Users.findOrCreate({
      where: { email: data.email },
      defaults: { name: data.name, password: data.password },
    })
      .then((result) => {
        if (result[1]) {
          result[0].privateKey = null
          return defaultResponse(result[0], HttpStatus.CREATED)
        }

        return errorResponse('Usuário já está cadastrado!', HttpStatus.BAD_REQUEST)
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }
}

export default UsersController
