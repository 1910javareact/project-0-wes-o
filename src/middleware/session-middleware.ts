import session from 'express-session'

//initial config for the session function
const sess = {
    secret: 'secret',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
}

//pass in config to the session function
export const sessionMiddleware = session(sess)