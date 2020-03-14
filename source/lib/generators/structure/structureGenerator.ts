import { Generator } from '../../types';

export class StructureGenerator extends Generator {

    protected keys: string[] = [];

    protected get structName(): string {
        return `${this.keys.slice(1).join('_')}_data`;
    }

    protected get propName(): string {
        return this.keys
            .reduce((accumulator, current) => accumulator + `.${current}`, '')
            .replace('.', '->');
    }

    protected get countName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_count`;
    }
    
    protected get propCountName(): string {
        const last = this.keys.length - 1;
        return `${this.keys.slice(0, last).reduce((accumulator, current) => accumulator += `.${current}`, '')}.${this.countName}`
            .replace('.', '->');
    }

    constructor(structure: any) {
        super(structure);
    }

}