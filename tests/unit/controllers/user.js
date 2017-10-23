import sinon from 'sinon'
import UsersController from '../../../controllers/user'
import User from '../../../models/user'


describe('Controllers: Users', () => {
  describe('criar um usuário: create()', () => {
    it('Deve criar um usuário', () => {
      User.findOrCreate = sinon.stub()

      const requestBody = {
        name: 'carlos',
        email: 'carlos@hotmail.com',
        password: '213',
      }

      const expectedResponse = [{
        id: 1,
        name: 'carlos',
        email: 'carlos@hotmail.com',
        created_at: '2017-08-06T23:55:36.692Z',
        updated_at: '2017-08-06T23:55:36.692Z',
        lastAccess: '2017-08-06T23:55:36.692Z',
      }, true]

      class fakeUser {
        static findOrCreate() {}
      }

      const response = {
        sendStatus: sinon.spy(),
      }

      const findOrCreateStub = sinon.stub(fakeUser, 'findOrCreate')

      findOrCreateStub.withArgs({
        where: { email: requestBody.email },
        defaults: {
          name: requestBody.name,
          password: requestBody.password,
        },
      }).resolves(expectedResponse)

      const usersController = new UsersController(fakeUser)

      return usersController.create(requestBody)
        .then((response) => {
          
          sinon.assert.match(response.statusCode, 201)
          sinon.assert.match(response.data.name, 'carlos')
          sinon.assert.match(response.data.email, 'carlos@hotmail.com')
          sinon.assert.match(response.data.lastAccess, '2017-08-06T23:55:36.692Z')
        })
    })
  })
})
