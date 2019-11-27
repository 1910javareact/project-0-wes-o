
import { Reimbursement } from '../models/reimbursement';
import { daoGetReimbursementsByStatusId, daoGetReimbursementsByUserId, daoPostReimbursement } from '../repositories/reimbursement-dao';

export async function postReimbursements(post:string){ // :Promise<Reimbursement[]>
    //do some processing
    let res = await daoPostReimbursement(post)
    console.log(res + " -RES");
    //return res
}

export async function getReimbursementsByStatusId(statusid:number):Promise<Reimbursement[]>{
    console.log("Service: searching for reimbursement " + statusid + " ...");  
    return await daoGetReimbursementsByStatusId(statusid)
}

export async function getReimbursementsByUserId(userid:number):Promise<Reimbursement>{
    console.log("Service: searching for reimbursement " + userid + " ...");  
    return await daoGetReimbursementsByUserId(userid)
}

