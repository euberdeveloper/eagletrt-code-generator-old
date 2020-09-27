import { ConfigModel, Generator, StructureModel } from '../../types';

export class ConfigGenerator extends Generator {

    protected keys: string[] = [];

    protected get structName(): string {
        return `${this.keys.join('_')}_config_t`;
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

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
    }

}