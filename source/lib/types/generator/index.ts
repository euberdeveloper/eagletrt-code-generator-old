import { ConfigModel } from "../config";
import { StructureModel } from "../structure";

export interface Code {
    comment: string;
    code: string;
}

export class Generator {

    protected comment: string;
    protected code = '';
    
    protected print(str: string): void {
        this.code += `${str}\n`;
    }

    protected generate(): void {}

    constructor(protected structure: StructureModel, protected config: ConfigModel) {}

    public get generated(): Code {
        return {
            comment: this.comment,
            code: this.code
        };
    }

}