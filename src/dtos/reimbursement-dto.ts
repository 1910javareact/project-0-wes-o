
// This DTO can be used in different ways
// For example, filter out field values in the Dto-to-R 
export class ReimbursementDTO {
    reimbursementid: number;
    author: number;
    amount: number;
    datesubmitted: number;
    dateresolved: number;
    description: string;
    resolver: number;
    statusid: number;
    status: number;
    typeid: number;
    type: number;
}