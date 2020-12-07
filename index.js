const express = require('express')
const path = require('path')
const app = express()
const pessoas = require('./routes/pessoas')
const model = require('./models/index')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))
app.use('/pessoas', pessoas)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

model.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => console.log('CRUD-ORM listening'))
})
