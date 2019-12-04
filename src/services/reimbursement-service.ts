
import { Reimbursement } from '../models/reimbursement';
import { daoGetReimbursementsByStatusId, daoGetReimbursementsByUserId, daoSaveOneReimbursement } from '../repositories/reimbursement-dao';

// export async function postReimbursements(post){ //:Reimbursement):Promise<Reimbursement>{
//     //do some processing
//     try{
//     let res = await daoPostReimbursement(post)
//     console.log(res + " -RES");
//     return res
//     }catch(e){
//         throw e
//     }    
// }

export async function getReimbursementsByStatusId(statusid:number):Promise<Reimbursement[]>{
    console.log("Service: searching for reimbursement " + statusid + " ...");  
    try{
        return await daoGetReimbursementsByStatusId(statusid)
    }catch(e){
        throw e
    }    
}

export async function getReimbursementsByUserId(userid:number):Promise<Reimbursement[]>{
    console.log("Service: searching for reimbursement " + userid + " ...");  
    try{
        return await daoGetReimbursementsByUserId(userid)
    }catch(e){
        throw e
    }    
}

export async function saveOneReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
    try{
        // console.log(reimbursement);
        
        return await daoSaveOneReimbursement(reimbursement)
    }catch(e){
        throw e
    }
}
