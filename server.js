if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'./.env'})
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',error=> console.error(error))
db.once('open',()=>console.log('connected to mongoose'))
app.listen(process.env.PORT || 3000)