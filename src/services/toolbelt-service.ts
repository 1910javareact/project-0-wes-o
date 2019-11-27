
import { daoGetAllToolbelts, daoSaveOneToolbelt, daoGetToolbeltById, daoGetToolbeltByUsernameAndPassword } from "../repositories/toolbelt-dao";
import { ToolBelt } from "../models/toolbelt";

//this layer is for processing requests both before and after getting data from database

export async function getAllToolbelts():Promise<ToolBelt[]>{
    //do some processing
    let res = await daoGetAllToolbelts()
    console.log(res + " -RES");
    return res
}

export async function saveOneToolbelt(t:ToolBelt):Promise<ToolBelt>{
    return await daoSaveOneToolbelt(t)
}

export async function getToolbeltById(userid:number):Promise<ToolBelt>{
    console.log("Service: searching for toolbelt " + userid + " ...");  
    return await daoGetToolbeltById(userid)
}

export function getToolbeltByUsernameAndPassword(username:string, password:string){
    //add hashing and salting password here
    return daoGetToolbeltByUsernameAndPassword(username, password)
}