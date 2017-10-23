import AuthController from '../../../controllers/auth'
import sinon from 'sinon'
import User from '../../../models/user'


describe('Controllers: Auth', () => {
  describe('verificar se usuario ja existe: userAlreadyExists()', () => {
    it('Deve verificar se um usuario existe', () => {
      User.findOne = sinon.stub()

      const requestBody = {
        email: 'carlos@hotmail.com',
        password: '213',
      }

      const expectedResponse = {
        _modelOptions: {
          classMethods: {
            isPassword: (password, passwordExpected) => true,
          },
        },

        id: 1,
        name: 'carlos',
        email: 'carlos@hotmail.com',
        password: '123',
        created_at: '2017-08-06T23:55:36.692Z',
        updated_at: '2017-08-06T23:55:36.692Z',
        lastAccess: '2017-08-06T23:55:36.692Z',

      }

      class fakeAuth {
        static findOne() {}
      }

      const request = {
        body: {
          email: 'carlos@gmail.com',
          password: '123',
        },
      }

      const response = {
        sendStatus: sinon.spy(),
      }

      const findOneStub = sinon.stub(fakeAuth, 'findOne')

      const email = request.body.email
      findOneStub.withArgs({ where: { email } }).resolves(expectedResponse)

      const authController = new AuthController(fakeAuth)

      return authController.userAlreadyExists(request, response)
        .then((result) => {
          sinon.assert.match(result.id, 1)
          sinon.assert.match(result.payload.name, 'carlos')
          sinon.assert.match(result.payload.email, 'carlos@hotmail.com')
          sinon.assert.match(result.payload.lastAccess, '2017-08-06T23:55:36.692Z')
          sinon.assert.match(result.privateKey, '')
        })
    })
  })
})
