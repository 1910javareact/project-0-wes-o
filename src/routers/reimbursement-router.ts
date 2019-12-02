import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { postReimbursements, getReimbursementsByUserId } from '../services/reimbursement-service';

export const reimbursementRouter = express.Router()

//All Users make reimbursements 
reimbursementRouter.post('/reimbursements', authorization(['User']), async (req, res)=>{ 
    //const {body} = req
    let post = {
            author: req.session.user.userid, 
            amount: req.session.body.amount,
            description: req.session.body.description,
            type: req.session.body.type 
        }

        try{
            let rms = await postReimbursements(post);
            res.status(201).json(rms) 
            console.log(req.session.user.role + " role");
        }catch{
            res.status(400).send('Invalid Credentials')
        }
    
        //if (req.session.user.userid != 2){
        res.status(401).send('The incoming token has expired.')
           
});

//find a particular reimbursement by userId --only for Finance-Manager
reimbursementRouter.get('/author/userId/:id', authorization(['Finance-Manager']), async (req,res)=>{
    let id = +req.params.id//from req.params, give me id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try{
            let toolbelt = await getReimbursementsByUserId(id)
            res.json(toolbelt)
        }catch(e){
            res.status(e.status).send(e.message)
        }   
    }
});
