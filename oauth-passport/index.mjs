
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import * as Database from './database.mjs'


// How to create an access token from a unique user ID (from our database) (or any object for that matter)
// This is used for any provider, doesn't matter
passport.serializeUser((userId, done) => done(null, userId))
passport.deserializeUser((userId, done) => done(null, userId))

passport.use(new GoogleStrategy({
    clientID: '803977559032-f0q8ccjjlhs6mddnthnih8pf19ulffir.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/redirect'
}, onLoginWithGoogleRedirect))


const loginWithGoogle = passport.authenticate('google', {
    scope: ['profile']  // Check out google API to get other things you can request
})
function onLoginWithGoogleRedirect(accessToken, refreshToken, googleProfile, next) {
    console.log('User was just redirected to auth/google/redirect with id: ' + googleProfile.id)
    const userFromDatabase = Database.addOrGetUser(`google|${googleProfile.id}`)
    next(null, `google|${googleProfile.id}`)  // Proceeds to serialize the user
}







// Express standard routes
import express from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors'

const app = express()

// CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4000',
    exposedHeaders: ['SET-COOKIE']
}))

// Serve HTML files in ./public
app.use(express.static('public'))

// Cookies middleware
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['aNyRanDoMStRInG1928302193']     // Encrypts cookie with a password
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.get('/auth/google', loginWithGoogle)    // Implemented in the google strategy part
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    const userId = req.user                 // Hard-coded into .user
    res.send('ok')
})
app.get('/auth/logout', (req, res) => {
    req.logout()
    res.send('Logged out.')
})

app.get('/my-route', (req, res) => {
    const isUserLoggedIn = req.user != null
    if (isUserLoggedIn) {
        res.send("You're good to go my man")
    } else {
        res.send('Not this time bruv')
    }
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})




