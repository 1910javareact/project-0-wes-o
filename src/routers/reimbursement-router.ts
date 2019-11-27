import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { postReimbursements, getReimbursementsByUserId } from '../services/reimbursement-service';

export const reimbursementRouter = express.Router()

//find all reimbursements 
let finManageAllReimbursements = reimbursementRouter.post('/reimbursements', async (req, res)=>{
    let {username, password} = req.body   
    try{
        if ((req.session.user.userid !== 3) && (!username || !password)){
            let post = req.session.user.reimbursement.description
            let rms = await postReimbursements(post);
            res.json(rms) 
            console.log(req.session.user.role + " role");
        }
        else {
            res.status(400).send('Invalid Credentials')
        }
    }catch{     
        //if (req.session.user.userid != 2){
        res.status(401).send('The incoming token has expired.')
        
    }    
});

//find a particular reimbursement by userId --only for Finance-Manager
let finManageAReimbursement = reimbursementRouter.get('/author/userId/:id', async (req,res)=>{
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

//Finance Manager 
reimbursementRouter.get('/reimbursements', [ authorization(['Finance-Manager']), finManageAllReimbursements , finManageAReimbursement ]);



//Reference Materials

//     if(!author){
//         res.status(400).send('Please include all Post fields')
//     }
//     for(let key in newP['author']){
//         if(author[key] === undefined){
//             res.status(400).send('Please include all Post fields')
//             break;
//         }else{
//             newP['author'][key] = author[key]
//         }
//     }
//     try{
//         let result = pservice.saveOnePost(newP)
//         if(result){
//             res.sendStatus(201)
//         }
//     }catch(e){
//         if(e === 500){
//             res.sendStatus(500)
//         }else{
//             res.sendStatus(400)
//         }
//     }
// })

// //this is for liking a post
// postRouter.patch('/:id', [authorization(['User']), (req,res)=>{
//     let id = +req.params.id
//     let garden = req.session.user
//     try{
//         let post = pservice.likePost(id, garden)
//         res.json(post)
//     }catch(e){
//         res.status(e.status).send(e.message)
//     }
    
// }])