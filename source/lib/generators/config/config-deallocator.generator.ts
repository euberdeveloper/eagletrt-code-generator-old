import { ConfigModel, StructureModel, ConfigPrimitiveArray, ConfigPrimitive } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigDeallocatorGenerator extends ConfigGenerator {

    private freePrimitiveArray(data: ConfigPrimitiveArray): void {
        const type = this.getPrimitiveType(data[0]);
        this.print( (type === 'char*')
            ? `freeStringsArray(${this.propName}, &${this.propCountName});`
            : `free(${this.propName});`
        );
    }

    private parse(data: ConfigModel, name: string): void {
        this.keys.push(name);

        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.keys.push(key);
                this.freePrimitiveArray(data[key] as ConfigPrimitiveArray);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.parse(data[key] as ConfigModel, key);
            }
            else if (this.getPrimitiveType(data[key] as ConfigPrimitive) === 'char*') {
                this.keys.push(key);
                this.print(`free(${this.propName});`);
                this.keys.pop();
            }
        }

        this.keys.pop();
    }

    protected comment = '{{GENERATE_CONFIG_DEALLOCATOR}}';
    protected generate(): void {
        this.parse(this.config, `config`);
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }
}

export { ConfigDeallocatorGenerator as generator };