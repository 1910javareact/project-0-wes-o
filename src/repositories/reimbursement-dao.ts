import { PoolClient } from "pg";
import { connectionPool } from ".";
import moment from 'moment'
import { reimbursementDTOtoReimbursement, multiReimbursementDTOtoReimbursement } from "../util/reimbursementDto-to-reimbursement";
import { Reimbursement } from "../models/reimbursement";

// make a new Reimbursement
export async function daoPostReimbursement(post) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('INSERT INTO tool_belt.reimbursement(author, amount, datesubmitted, dateresolved, description, resolver, statusid, typeid) values ($1,$2,$3,$4,$5,null,1,$6)',
            
        [post.author, post.amount, moment(new Date() ), 0, post.description, post.type]); //Date.now() tbd
        
        const result = await client.query('SELECT * FROM tool_belt.reimbursement WHERE author = $1 ORDER BY reimbursementid DESC LIMIT 1 OFFSET 0',
            [post.author]);
        client.query('COMMIT');
        return reimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        client.query('ROLLBACK');
        throw{
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.release();
    }
}

// get for a given status Id
export async function daoGetReimbursementsByStatusId(statusId: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM tool_belt.reimbursement NATURAL JOIN tool_belt.reimbursementstatus NATURAL JOIN tool_belt.reimbursementtype WHERE statusid = $1 ORDER BY datesubmitted DESC',
        [statusId]);
        if (result.rowCount === 0) {
            throw 'No Reimbursements Yet!';
        } else {
            return multiReimbursementDTOtoReimbursement(result.rows);
        }
} catch (e) {
    if (e === 'No Reimbursements By That Status') {
        throw {
            status: 404,
            message: 'No Reimbursements By That Status'
        };
    } else {
        throw{
            status: 500,
            Message: 'something went wrong with the server, try again later'
        };
    }
} finally {
    client && client.release();
    }
}    

export async function daoGetReimbursementsByUserId(userid: number): Promise<Reimbursement> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM tool_belt.reimbursement where author = $1;', [userid]);
        if (result.rowCount > 0) {
            return reimbursementDTOtoReimbursement(result.rows);
        } else {
            throw 'No Reimbursement';
        }

    }catch (e) {
        if (e === 'No Reimbursement') {
            throw {
                status: 404,
                message: 'This reimbursement does not exist yet.'
            };
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }finally{
        client && client.release()
    }
}