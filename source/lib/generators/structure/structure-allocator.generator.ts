import { ConfigModel, StructureGroup, StructureMessages, StructureModel } from '../../types';
import { StructureGenerator } from './structureGenerator';

class StructureAllocatorGenerator extends StructureGenerator {

    private parse(data: StructureGroup | StructureMessages): void {
        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.keys.push(key);
                const keys = this.propName;
                const keysCount = this.propCountName;
                const type = this.structName;
                this.print(`data${keys}_size = ${data[key][1]};`);
                this.print(`data${keys} = (${type}*) malloc(sizeof(${type}) * data${keys}_size);`);
                this.print(`data${keysCount} = 0;`);
                this.parse(data[key][0]);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.keys.push(key);
                this.parse(data[key]);
                this.keys.pop();
            }
        }
    }

    protected comment = '{{GENERATE_STRUCTURE_ALLOCATOR}}';
    protected generate(): void {
        this.parse(this.structure);
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { StructureAllocatorGenerator as generator };