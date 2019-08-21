import { port } from './config'
import app from './app'

app.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})
