import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigPrintGenerator extends ConfigGenerator {

    private printPrimitive(data: ConfigPrimitive) {
        const formatter = this.getPrimitivePrintfFormatter(data);
        this.print(`printf("${this.propName}:\\t${formatter}\\n", ${this.propName});`);
    }

    private printPrimitiveArray(data: ConfigPrimitiveArray) {
        const type = this.getPrimitiveType(data[0]);
        this.print(`printf("${this.propName}: ");`);
        
        if (type === "char*") {
            this.print(`printStringsArray(${this.propName}, ${this.propCountName});`);
        }
        else if (type === 'double') {
            this.print(`printDoubleArray(${this.propName});`);
        }
        else if (type === 'int') {
            this.print(`printIntArray(${this.propName});`);
        }
    }

    private parse(data: ConfigModel, name: string): void {
        this.keys.push(name);
        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.keys.push(key);
                this.printPrimitiveArray(data[key] as ConfigPrimitiveArray);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.parse(data[key] as ConfigModel, key);
            }
            else {
                this.keys.push(key);
                this.printPrimitive(data[key] as ConfigPrimitive);
                this.keys.pop();
            }
        }
        this.keys.pop();
    }

    protected comment = '{{GENERATE_CONFIG_PRINT}}';
    protected generate(): void {
        this.parse(this.config, 'config');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigPrintGenerator as generator };
