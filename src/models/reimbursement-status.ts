
export class ReimbursementStatus {
    statusid: number //primary key
    status: string  //Pending,Approved,Denied

    constructor(statusid: number, status: string) {
        this.statusid = statusid;
        this.status = status;
    }
}