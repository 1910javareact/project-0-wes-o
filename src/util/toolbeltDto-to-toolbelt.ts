
import { ToolBeltDTO } from '../dtos/toolbelt-dto';
import { ToolBelt } from '../models/toolbelt';

//takes in an array of DTOs
export function toolbeltDTOtoToolbelt(tD: ToolBeltDTO[]): ToolBelt {
    const roles = [];
    for (const t of tD) {
        roles.push(t.role); 
    }
    return new ToolBelt(       
    tD[0].userid, //primary key
    tD[0].firstname,
    tD[0].lastname,
    tD[0].email,
    tD[0].username,
    tD[0].password,
    tD[0].role
)};

//this function takes in dtos, some with same id
//adds all dtos with same id to a temp array
export function multiToolbeltDTOConvertor(tD: ToolBeltDTO[]): ToolBelt[] {
    
    const result: ToolBelt[] = [];
    
    let currentToolbelt: ToolBeltDTO[] = [];
    for (const t of tD) {
        if (currentToolbelt.length === 0) {
            currentToolbelt.push(t);
        } else if (currentToolbelt[0].userid === t.userid) {
            currentToolbelt.push(t);
        } else {
            result.push(toolbeltDTOtoToolbelt(currentToolbelt));
            currentToolbelt = [];
            currentToolbelt.push(t);
        }
    }
    result.push(toolbeltDTOtoToolbelt(currentToolbelt));
    return result;

    // for (const t of tD) {
    //     result.push(toolbeltDTOtoToolbelt([t]));
    // }
    // return result;
}
