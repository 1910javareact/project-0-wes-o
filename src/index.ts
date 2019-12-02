import express from 'express'
import bodyparser from 'body-parser'
import { toolbeltRouter } from './routers/toolbelt-router'
import { loggingMiddleware } from './middleware/logging-middleware'
import { sessionMiddleware } from './middleware/session-middleware'
import { getToolbeltByUsernameAndPassword } from './services/toolbelt-service'
import { reimbursementRouter } from './routers/reimbursement-router'

//application build from express
const app = express()

//Initial message to Welcome!
// app.use('/', (req, res)=>{ 
//      res.json('Welcome!')
// });

//connect bodyparser to express 'app'
app.use(bodyparser.json())

//logging
app.use(loggingMiddleware)

//every req object, we can access using req.session
app.use(sessionMiddleware)

//base path of /toolbelts
app.use('/toolbelts', toolbeltRouter)

//base path of /reimbursements
app.use('/reimbursements', reimbursementRouter)

app.post('/login', async (req,res)=>{
    let {username, password} = req.body
    if(!username || !password ){
        res.status(400).send('Invalid Credentials')
    }else{ 
        try{
            let user = await getToolbeltByUsernameAndPassword(username, password)
            req.session.user = user
            console.log(user.role + " role");
            res.json(user) //send json message 'user'
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
});

// Access the session at /test endpoint
app.get('/test', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('This is the session info. Refresh!')
    }
});

// Server running on port 2001
app.listen(2001, ()=>{
    console.log('app has started');   
});
