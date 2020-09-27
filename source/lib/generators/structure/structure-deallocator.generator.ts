import { ConfigModel, StructureGroup, StructureMessages, StructureModel } from '../../types';
import { StructureGenerator } from './structureGenerator';

class StructureDeallocatorGenerator extends StructureGenerator {

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

    protected comment = '{{GENERATE_STRUCTURE_DEALLOCATOR}}';
    protected generate(): void {
        this.parse(this.structure);
        this.print(`free(data);`);
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { StructureDeallocatorGenerator as generator };