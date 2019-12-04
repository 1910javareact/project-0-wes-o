import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { getReimbursementsByUserId, saveOneReimbursement, getReimbursementsByStatusId } from '../services/reimbursement-service';
import { Reimbursement } from '../models/reimbursement';

export const reimbursementRouter = express.Router()

//find a particular reimbursement by userId
reimbursementRouter.get('/author/userId/:userid', [authorization(['Finance-Manager','Admin','User'])], async (req, res)=>{
    let userId = +req.params.userid
    if(isNaN(userId)){
        res.status(400).send('Invalid ID')
    }
    
    if(req.session.user.role === 'Finance-Manager'){
        try{
            console.log("tryyy " + userId)
            await getReimbursementsByUserId(userId)
            const reimbursement = await getReimbursementsByUserId(userId)

            if(reimbursement){
                console.log(reimbursement)
                res.status(200).json(reimbursement) 
            }
            else{
                res.status(404).send('Reimbursement does not exist')
            }
        }
        catch(e){
            console.log(e);
            res.status(e.status).send(e.message)
        }
    }else{
        try{
            console.log("try")
            let reimbursement = await getReimbursementsByUserId(userId)
            // if(req.session.user.userid === reimbursement.author ){
            //     res.status(200).json(reimbursement)
            // }
            
            if(req.session.user.userid === reimbursement[0].author ){
                res.status(200).json(reimbursement) 
            }else{
                res.status(404).send('The session token has expired')
            }
        }
        catch(e){
            console.log(e);
            res.status(401).send('Invalid Credentials')
            res.status(e.status).send(e.message)
        }
    }
})

//find a particular reimbursement by userId
reimbursementRouter.get('/statusId/:statusid', [authorization(['Finance-Manager'])], async (req, res)=>{
    let statusId = +req.params.statusid
    if(isNaN(statusId)){
        res.status(400).send('Invalid ID')
    }
    
    if(req.session.user.role === 'Finance-Manager'){
        try{
            console.log("tryyy " + statusId)
            await getReimbursementsByStatusId(statusId)
            let reimbursement = await getReimbursementsByStatusId(statusId)

            if(reimbursement){
                console.log(reimbursement)
                res.status(200).json(reimbursement) 
            }
            else{
                res.status(404).send('Reimbursement does not exist')
            }
        }
        catch(e){
            console.log(e);
            res.status(e.status).send(e.message)
        }
    }else{
        try{
            console.log("try")
            let reimbursement = await getReimbursementsByStatusId(statusId)
            // if(req.session.user.userid === reimbursement.author ){
            //     res.status(200).json(reimbursement)
            // }
            
            if(req.session.user.userid === reimbursement[0].author ){
                res.status(200).json(reimbursement) 
            }else{
                res.status(404).send('The session token has expired')
            }
        }
        catch(e){
            console.log(e);
            res.status(401).send('Invalid Credentials')
            res.status(e.status).send(e.message)
        }
    }
})


reimbursementRouter.post('',//[authorization(['Finance-Manager', 'Admin', 'User'])], 
async (req, res) => {
    let {body} = req
    

    let newReimbursement = new Reimbursement(8,0,0,0,0,'',0,0,0)
        try{    
            for(let key in newReimbursement){
                // console.log(key); //
                
                if(body[key] === undefined){
                    // console.log(body[key]); //
                    
                    res.status(400).send('All fields are required for a reimbursement')
                    
                }else{
                    newReimbursement[key] = body[key]
                }
            }
            // console.log(newReimbursement);
            
            let update = await saveOneReimbursement(newReimbursement)

            if(update){
                res.status(201).send('Update') 
            }else{
                res.status(404).send('Reimbursement does not exist')
            }
        }catch(e){
            res.status(e.status).send(e.message)
        }
})