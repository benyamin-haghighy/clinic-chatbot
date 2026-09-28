const express = require('express')
const authRouter = require('./src/module/auth/auth.route')
const path = require('path')
const cookieParser = require('cookie-parser')
const configApp = require('./config.app')
const passport = require('passport')
const accessTokenCookie = require('./src/utils/cookieStrtegy')
const messageRouter = require('./src/module/messages/message.route')
const conversationRouter = require('./src/module/conversations/conversations.route')
const app = express()




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(configApp.cookie.secret))
app.use('/js',express.static(path.resolve(__dirname, 'src', 'public', 'js')))
app.use('/image',express.static(path.resolve(__dirname, 'src', 'public', 'image')))
app.use('/css',express.static(path.resolve(__dirname, 'src', 'public', 'css')))


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'src', 'views'))

passport.use('accessToken', accessTokenCookie)
app.use(passport.initialize())

app.use('/auth',authRouter)
app.use('/message',messageRouter)
app.use('/conversation',conversationRouter)



app.get('/', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/chat', passport.authenticate('accessToken', {
    session: false,
    failureRedirect: '/'
}), (req, res) => {
    console.log('CHAT ROUTE REACHED')
        console.log('CHAT USER:', req.user)

        res.render('chat')
})

module.exports = app