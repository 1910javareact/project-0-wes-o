import express from 'express'
import { getAllToolbelts, getToolbeltById, updateOneToolbelt } from '../services/toolbelt-service'
import { authorization } from '../middleware/auth-middleware'
import { ToolBelt } from '../models/toolbelt';
import { Role } from '../models/role';

//this file holds all of the toolbelt endpoints

//the toolbelt routers have the same base path, as seen in index.ts
export const toolbeltRouter = express.Router()

//find all toolbelts --only for Finance-Manager
toolbeltRouter.get('', [authorization(['Finance-Manager'])], async (req, res) => {
    const { username, password } = req.body
    try {
        if (req.session.user.userid !== 2) {
            res.status(401).send('The incoming token has expired.')
        }
        else {
            let toolbelts = await getAllToolbelts()
            res.json(toolbelts)
            console.log(req.session.user.role + " role");
        }
    } catch{
        if (!username || !password) {
            res.status(400).send('Invalid Credentials')
        }
    }
});

//find a particular toolbelt by id --only for Finance-Manager
toolbeltRouter.get('/:id', [authorization(['Finance-Manager'])], async (req, res) => {
    const id = +req.params.id//from req.params, give me id
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let toolbelt = await getToolbeltById(id)
            res.json(toolbelt)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
});

//update a particular toolbelt --only for Admin
toolbeltRouter.patch('', [authorization(['Admin'])], async (req, res) => {
    const { body } = req

    const newToolbelt = new ToolBelt(5, '', '', '', '', '', new Role(3, ``))

    for (let key in newToolbelt) {
        console.log(key + " key"); //

        if (body[key] === undefined) {

            console.log("in IF")
            // res.status(400).send('All fields are required for a toolbelt')

        } else {
            newToolbelt[key] = body[key]
        }
    }
    console.log(newToolbelt + " toolbelt");

    try {
        console.log("Try")
        const update = await updateOneToolbelt(newToolbelt)

        res.status(201).json(update)

    } catch (e) {
        console.log("Catch")
        res.status(e.status).send(e.message)
    }
})

