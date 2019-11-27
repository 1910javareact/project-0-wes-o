import { Role } from "../models/role"

//the database version of ToolBelt
//this dto is after the natural join to get the roles
export class ToolBeltDTO {
    userid: number //primary key
    firstname:string
    lastname:string
    email:string
    username:string
    password:string
    role: Role
}    