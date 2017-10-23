import app from './app'

app.listen(app.get('port'), () => {
  console.log(`server running on ${app.get('port')}`)
})
