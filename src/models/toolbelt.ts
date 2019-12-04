import { Role } from "./role"

export class ToolBelt {
    userid: number //primary key
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    role: Role
    constructor(userid: number, firstname: string, lastname: string, email: string, username: string, password: string, role: Role) {
        this.userid = userid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}