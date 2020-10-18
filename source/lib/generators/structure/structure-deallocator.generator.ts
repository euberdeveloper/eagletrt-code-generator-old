import { ConfigModel, StructureGroup, StructureMessages, StructureModel } from '../../types';
import { StructureGenerator } from './structureGenerator';

/**
 * The StructureDeallocatorGenerator class, extending the StructureGenerator class and generating the code that deallocates a data structure.
 */
class StructureDeallocatorGenerator extends StructureGenerator {

    /**
     * Given the structure model generates the code that deallocates the data structure.
     * @param data The structure model or one of its nested property values.
     */
    private parse(data: StructureGroup | StructureMessages): void {
        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.keys.push(key);
                this.parse(data[key][0]);
                this.print(`free(data${this.propName});`);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.keys.push(key);
                this.parse(data[key]);
                this.keys.pop();
            }
        }
    }

    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_STRUCTURE_DEALLOCATOR}}';
    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.structure);
        this.print(`free(data);`);
    }

    /**
     * The constructor of the StructureDeallocatorGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { StructureDeallocatorGenerator as generator };