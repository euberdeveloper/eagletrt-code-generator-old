import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigTypeGenerator extends ConfigGenerator {

    private indentation = 0;
    private structs: string[] = [];
    private cursor = -1;

    protected print(str: string): void {
        this.structs[this.cursor] += `${this.indentationTabs}${str}\n`;
    }

    private get indentationTabs(): string {
        return Array(this.indentation)
            .fill('\t')
            .join('');
    }

    private addStruct(): void {
        this.structs.splice(this.cursor + 1, 0, '');
    }
    
    private parsePrimitive(data: ConfigPrimitive, key: string): void {
        this.print(`${this.getPrimitiveType(data)} ${key};`);
    }

    private parsePrimitiveArray(data: ConfigPrimitiveArray, key: string): void {
        const type = this.getPrimitiveType(data[0]);
        this.print(`${type}* ${key};`);
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

    protected comment = '{{GENERATE_CONFIG_TYPE}}';
    protected generate(): void {
        this.parse(this.config, 'config_t');
        this.code = this.structs.reverse().join('\n');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigTypeGenerator as generator };