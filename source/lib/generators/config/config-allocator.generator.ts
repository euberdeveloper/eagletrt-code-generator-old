import { ConfigModel, StructureModel, ConfigPrimitiveArray, ConfigPrimitive } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigAllocatorGenerator extends ConfigGenerator {

    private parsePrimitive(defaultValue: ConfigPrimitive): void {
        const type = this.getPrimitiveType(defaultValue);
        const handledDefaultValue = (type === 'char*') ? `strdup("${defaultValue}")` : defaultValue;
        this.print(`${this.propName} = ${handledDefaultValue};`);
    }

    private parsePrimitiveArray(defaultValue: ConfigPrimitiveArray): void {
        const type = this.getPrimitiveType(defaultValue[0]);
        this.print(`${this.propCountName} = ${defaultValue.length};`)
        this.print(`${this.propName} = (${type}*) malloc(sizeof(${type}) * ${this.propCountName});`);

        defaultValue.forEach((el: string | number, index: number) => {
            this.keys.push(index);
            this.parsePrimitive(el);
            this.keys.pop();
        });
    }

    private parse(data: ConfigModel, name: string): void {
        this.keys.push(name);

        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.keys.push(key);
                this.parsePrimitiveArray(data[key] as ConfigPrimitiveArray);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.parse(data[key] as ConfigModel, key);
            }
            else {
                this.keys.push(key);
                this.parsePrimitive(data[key] as ConfigPrimitive);
                this.keys.pop();
            }
        }

        this.keys.pop();
    }

    protected comment = '{{GENERATE_CONFIG_ALLOCATOR}}';
    protected generate(): void {
        this.parse(this.config, `config`);
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }
}

export { ConfigAllocatorGenerator as generator };