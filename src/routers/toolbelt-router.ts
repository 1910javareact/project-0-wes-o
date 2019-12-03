import express from 'express'
import { getAllToolbelts, getToolbeltById } from '../services/toolbelt-service'
import { authorization } from '../middleware/auth-middleware'

//this file holds all of the toolbelt endpoints

//the toolbelt routers have the same base path, as seen in index.ts
export const toolbeltRouter = express.Router()

//find all toolbelts --only for Finance-Manager
let finManageAllToolbelts = toolbeltRouter.get('', async (req, res)=>{
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
        //if (req.session.user.userid != 2){
            if(!username || !password ){
                res.status(400).send('Invalid Credentials')
            }
    }    
});
               
//find a particular toolbelt by id --only for Finance-Manager
let finManageAToolbelt = toolbeltRouter.get('/:id', async (req,res)=>{
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


//Finance Manager 
toolbeltRouter.get('', [ authorization(['Finance-Manager']), finManageAllToolbelts , finManageAToolbelt ]);


// let userManagePersonalToolbelt = toolbeltRouter.get('/:id', async (req,res)=>{
//     let userAccessIdOnly = +req.params.id; 
    
//     if(isNaN(userAccessIdOnly)){
//         res.status(400).send('Invalid Credentials');
//     }
//     else if((userAccessIdOnly) !== (req.session.userid)){
//         res.status(400).send("Invalid Credentials: " + req.session.userid);
//     }
//     if((userAccessIdOnly) === (req.session.userid)){
//         res.status(200).send("Thanks for logging in: " + req.session.userid);
//         try{
//             let userAccessPersonalToolbelt = await getToolbeltById(userAccessIdOnly);
//             res.json(userAccessPersonalToolbelt);
//         }catch(e){
//             res.status(e.status).send(e.message);
//         }
//     }
// });


//Individual User
//toolbeltRouter.get('/:id', [ authorization(['User']), userManagePersonalToolbelt ]);


//REVISE for PATCH 
// gardenRouter.post('', [ authorization(['Admin','Finance-Manager']),(req,res)=>{
//     let {body} = req //destructuring
//     let newT = new Garden('',0,0, '', '', [],) // add new Role(number,string 
//     for(let key in newT){
//         console.log(body[key]);
        
//         if(body[key] === undefined){
//             res.status(400).send('Please include all toolbelt fields')
//             break;
//         }else{
//             newT[key] = body[key]
//         }
//     }
//     // if(saveOneGarden(newT)){
//     //     res.sendStatus(201)
//     // }else {
//     //     res.sendStatus(500)
//     // }
//     return null;
// }])
