
export class Reimbursement {
    reimbursementid: number
    author: number
    amount: number
    datesubmitted: number
    dateresolved: number
    description: string
    resolver: number
    status: number
    type: number

    constructor(reimbursementid: number, author: number, amount: number, datesubmitted: number, dateresolved: number, description: string, resolver: number, status: number, type: number) {
        this.reimbursementid = reimbursementid;
        this.author = author;  //User Fk
        this.amount = amount;
        this.datesubmitted = datesubmitted;
        this.dateresolved = dateresolved;
        this.description = description;
        this.resolver = resolver;  //User Fk
        this.status = status;  //ReimbursementStatus Fk
        this.type = type;  //ReimbursementType Fk

    }
}