
import { ReimbursementDTO } from '../dtos/reimbursement-dto';
import { Reimbursement } from '../models/reimbursement';

export function reimbursementDTOtoReimbursement(r: ReimbursementDTO[]): Reimbursement {
    return new Reimbursement(
        r[0].reimbursementid, 
        r[0].author, 
        r[0].amount, 
        r[0].datesubmitted, 
        r[0].dateresolved, 
        r[0].description, 
        r[0].resolver, 
        r[0].statusid, 
        r[0].typeid
)};

// take an array of reimbursementDTO's and turn them into an array of objects
export function multiReimbursementDTOtoReimbursement(rD: ReimbursementDTO[]): Reimbursement[] {
    
    const result: Reimbursement[] = [];
    
    for (const reimbursement of rD) {
        result.push(reimbursementDTOtoReimbursement([reimbursement]));
    }
    return result;
}