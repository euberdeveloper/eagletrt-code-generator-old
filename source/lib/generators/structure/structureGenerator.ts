import { ConfigModel, Generator, StructureModel } from '../../types';

/**
 * The StructureGenerator class, extending the Generator class and giving a blueprint for all the generators regarding the data structure.
 */
export class StructureGenerator extends Generator {

    /**
     * A stack of inspected keys.
     */
    protected keys: string[] = [];

    /**
     * Given the current inspected keys, returns the name of the associated struct.
     */
    protected get structName(): string {
        return `${this.keys.join('_')}_data`;
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property.
     */
    protected get propName(): string {
        return this.keys
            .reduce((accumulator, current) => accumulator + `.${current}`, '')
            .replace('.', '->');
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _count at the end and keeping only the last key.
     */
    protected get countName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_count`;
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _size at the end.
     */
    protected get sizeName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_size`;
    }
    
    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _count at the end.
     */
    protected get propCountName(): string {
        const last = this.keys.length - 1;
        return `${this.keys.slice(0, last).reduce((accumulator, current) => accumulator += `.${current}`, '')}.${this.countName}`
            .replace('.', '->');
    }

    /**
     * The constructor of the StructureGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
    }

}