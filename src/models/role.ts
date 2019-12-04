
export class Role {
    roleid: number //primary key
    role: string

    constructor(roleid: number, role: string) {
        this.roleid = roleid;
        this.role = role;
    }
}