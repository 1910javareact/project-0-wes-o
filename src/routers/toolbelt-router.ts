import express from 'express'
import { getAllToolbelts, getToolbeltById } from '../services/toolbelt-service'
import { authorization } from '../middleware/auth-middleware'

//this file holds all of the toolbelt endpoints

//the toolbelt routers have the same base path, as seen in index.ts
export const toolbeltRouter = express.Router()

//find all toolbelts --only for Finance-Manager
toolbeltRouter.get('', [ authorization(['Finance-Manager'])], async (req, res)=>{
    let {username, password} = req.body   
    try{
        if (req.session.user.userid !== 2){
            res.status(401).send('The incoming token has expired.')
        }
        else{
            let toolbelts = await getAllToolbelts()  
            res.json(toolbelts)
            console.log(req.session.user.role + " role");
        }
    }catch{     
            if(!username || !password ){
                res.status(400).send('Invalid Credentials')
            }
    }    
});
               
//find a particular toolbelt by id --only for Finance-Manager
toolbeltRouter.get('/:id', [ authorization(['Finance-Manager'])], async (req,res)=>{
    let id = +req.params.id//from req.params, give me id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try{
            let toolbelt = await getToolbeltById(id)
            res.json(toolbelt)
        }catch(e){
            res.status(e.status).send(e.message)
        }   
    }
});


