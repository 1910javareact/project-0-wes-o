
export class ReimbursementType {
    typeid: number //primary key
    type: string  //Lodging, Travel, Food, Other

    constructor(typeid: number, type: string) {
        this.typeid = typeid;
        this.type = type;
    }
}