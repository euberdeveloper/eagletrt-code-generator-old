import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigDeAllocatorGenerator extends ConfigGenerator {

    private indentation = 0;
    private structs: string[] = [];
    private cursor = -1;

    protected print(str: string): void {
        this.structs[this.cursor] += `${this.indentationTabs}${str}\n`;
    }

    protected get structName(): string {
        return this.keys.length === 1 ? this.keys[0] : `${this.keys.slice(1).join('_')}_config_t`;
    }

    private get indentationTabs(): string {
        return Array(this.indentation)
            .fill('\t')
            .join('');
    }

    private addStruct(): void {
        this.structs.splice(this.cursor + 1, 0, '');
    }

    private getPrimitiveType(data: ConfigPrimitive): string {
        if (typeof data === 'string') {
            return `char*`;
        }
        else if (typeof data === 'number' && data - Math.floor(data) === 0) {
            return `int`;
        }
        else if (typeof data === 'number' && data - Math.floor(data) !== 0) {
            return `double`;
        }
        else {
            return '';
        }
    }  
    
    private parsePrimitive(data: ConfigPrimitive, key: string): void {
        this.print(`${this.getPrimitiveType(data)} ${key};`);
    }

    private parsePrimitiveArray(data: ConfigPrimitiveArray, key: string): void {
        this.print(`${this.getPrimitiveType(data[0])}* ${key};`);
        this.print(`int ${key}_count;`);
    }

    private parse(data: ConfigModel, name: string): void {
        this.addStruct();
        this.keys.push(name);
        this.cursor++;
        this.indentation = 0;
        this.print(`typedef struct {`);
        this.indentation = 1;
        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.parsePrimitiveArray(data[key] as ConfigPrimitiveArray, key);
            }
            else if (typeof data[key] === 'object') {
                this.parse(data[key] as ConfigModel, key);
                this.print(`${this.structName} ${key};`);
                this.keys.pop();
            }
            else {
                this.parsePrimitive(data[key] as ConfigPrimitive, key);
            }
        }
        this.indentation = 0;
        this.print(`} ${this.structName};`);
        this.indentation = 1;
        this.cursor--;
    }

    protected comment = '{{GENERATE_CONFIG_DEALLOCATOR}}';
    protected generate(): void {
        this.parse(this.config, 'config_t');
        this.code = this.structs.reverse().join('\n');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigDeAllocatorGenerator as generator };