
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { multiToolbeltDTOConvertor, toolbeltDTOtoToolbelt } from '../util/toolbeltDto-to-toolbelt';
import { ToolBelt } from '../models/toolbelt';

//this file contains functions for interacting with the database

export async function daoGetAllToolbelts(): Promise<ToolBelt[]> {
    let client: PoolClient;
    //asynchronously because all our connections might be in use
    try {
        client = await connectionPool.connect();
        //when the promise resolves
        const result = await client.query('SELECT * FROM tool_belt.toolbelt natural join tool_belt.tool_belt_roles natural join tool_belt.roletype');
        if (result.rowCount === 0){
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }else{
            //console.log(result.rows);
            return multiToolbeltDTOConvertor(result.rows);
        }
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoSaveOneToolbelt(t: ToolBelt): Promise<ToolBelt> {
   //insert into the toolbelt table and tool_belt_roles table
   //return the toolbelt object
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query('BEGIN'); //start a transaction
        //the returning keyword can be used with insert, to return the values that actually got inserted
        const result = await client.query('INSERT INTO tool_belt.toolbelt (firstname, lastname, email, username, "password") values ($1,$2,$3,$4,$5) RETURNING userid',
        [t.firstname, t.lastname, t.email, t.username, t.password]);
        // 'for in' loop for key-value matches
        for (const role in t.role) {
            let roleid = 0;
            switch (role) {
                case 'Admin':
                    roleid = 1;
                    break;
                case 'Finance-Manager':
                    roleid = 2;
                    break;
                case 'User':
                    roleid = 3;
                    break;
                default :
                    break;
            }
            await client.query('INSERT INTO tool_belt.tool_belt_roles VALUES($1,$2)',
            [result.rows[0].userid, roleid ]);
        }
        t.userid = result.rows[0].userid;
        await client.query('COMMIT');
        return t;
    } catch (e) {
        await client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoGetToolbeltById(userid: number): Promise<ToolBelt> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM tool_belt.toolbelt natural join tool_belt.tool_belt_roles natural join tool_belt.roletype where userid = $1', [userid]);
        if (result.rowCount > 0) {
            return toolbeltDTOtoToolbelt(result.rows);
        } else {
            throw 'No Toolbelt';
        }
    } catch (e) {
        if (e === 'No Toolbelt') {
            throw {
                status: 404,
                message: 'This toolbelt does not exist yet.'
            };
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }finally {
        client && client.release();
    }
}

export async function daoGetToolbeltByUsernameAndPassword(username: string, password: string): Promise<ToolBelt> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        //prepared statement to sanitize user inputs, and to avoid sql injection
        const result = await client.query('SELECT * FROM tool_belt.toolbelt natural join tool_belt.tool_belt_roles natural join tool_belt.roletype WHERE username = $1 and password = $2',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'Invalid Credentials';
            
        } else {
            console.log(result.rows);
            return toolbeltDTOtoToolbelt(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'Invalid Credentials') {
            throw {
                status: 401,
                message: 'Invalid Credentials'
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