import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimbursementDTOtoReimbursement, multiReimbursementDTOtoReimbursement } from "../util/reimbursementDto-to-reimbursement";
import { Reimbursement } from "../models/reimbursement";

// Get reimbursement for a given status Id
export async function daoGetReimbursementsByStatusId(statusId: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM tool_belt.reimbursement where reimbursement.status = $1;', [statusId]);
        if (result.rowCount > 0) {
            return multiReimbursementDTOtoReimbursement(result.rows);
        } else {
            throw 'No Reimbursement'
        }
    } catch (e) {
        if (e === 'No Reimbursement') {
            throw {
                status: 404,
                message: 'This reimbursement does not exist yet.'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

// Get reimbursement for a given UserId      
export async function daoGetReimbursementsByUserId(userid: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM tool_belt.reimbursement where reimbursement.author = $1;', [userid]);
        if (result.rowCount > 0) {
            return multiReimbursementDTOtoReimbursement(result.rows);
        } else {
            throw 'No Reimbursement'
        }
    } catch (e) {
        if (e === 'No Reimbursement') {
            throw {
                status: 404,
                message: 'This reimbursement does not exist yet.'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release()
    }
}

// make a new Reimbursement
export async function daoSaveOneReimbursement(r: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()

        client.query('BEGIN');

        await client.query(`INSERT INTO tool_belt.reimbursement ( author, amount, datesubmitted, dateresolved, description, resolver, status, "type") values ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [r.author, r.amount, r.datesubmitted, r.dateresolved, r.description, r.resolver, r.status, r.type])

        const result = await client.query('SELECT * FROM tool_belt.reimbursement WHERE author = $1 ORDER BY reimbursementid DESC LIMIT 1 OFFSET 0',
            [r.author]);
        client.query('COMMIT');
        return reimbursementDTOtoReimbursement(result.rows);

        //     client.query('COMMIT');
        // const result = await client.query(`SELECT * FROM tool_belt.reimbursement WHERE reimbursementid = $1`,
        //     [Reimbursement.rows[0].reimbursementid])
        // return reimbursementDTOtoReimbursement(result.rows)

    } catch (e) {
        client.query('ROLLBACK');
        console.log(e)
        throw {
            status: 500,
            message: 'Unfortunately, Internal Server Error'
        }
    } finally {
        client && client.release()
    }
}