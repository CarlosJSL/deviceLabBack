import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

export default (app) => {
  const Users = app.datasource.models.Users
  const opts = {}

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt')

  opts.secretOrKeyProvider = (request, rawJwtToken, done) => {
    const tokenDecoded = jwt.decode(rawJwtToken, { complete: true })

    Users.findOne({ where: { email: tokenDecoded.payload.email } })
      .then(user => done(null, user.privateKey))
      .catch(err => err)
  }


  passport.use(new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          })
        }
        return done(null, false)
      })
      .catch(error => done(error, null))
  }))

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession),
  }
}
