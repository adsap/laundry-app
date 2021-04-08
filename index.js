const express = require('express')
const router = require('./routes')
const app = express()
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(router)

app.listen(port, err => {
  if (err) console.log(err);
  else console.log(`app running in port: ${port}`);
})