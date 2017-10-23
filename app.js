import bodyParser from 'body-parser'
import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users'
import authRouter from './routes/auth'
import datasource from './config/datasource'
import config from './config/config'
import authorization from './auth'

const app = express()

app.use(cors({ exposedHeaders: ['AUTH-TOKEN'] }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.config = config
app.datasource = datasource(app)

app.set('port', 3000)

const auth = authorization(app)


app.auth = auth

usersRouter(app)
authRouter(app)

export default app
