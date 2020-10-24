import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

/**
 * The ConfigPrintGenerator class, extending the ConfigGenerator class and generating the code that prints a config structure.
 */
class ConfigPrintGenerator extends ConfigGenerator {
    
    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_CONFIG_PRINT}}';

    /**
     * The constructor of the ConfigPrintGenerator class.
     * @param structure The structure model: the generated code will not actually depend on it.
     * @param config The config model: the generated code will depend on it.
     */
    public constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

    /**
     * Given the config primitive value, prints the code that prints it.
     * @param data The primitive value.
     */
    private printPrimitive(data: ConfigPrimitive) {
        const formatter = this.getPrimitivePrintfFormatter(data);
        this.print(`printf("${this.propName}:\\t${formatter}\\n", ${this.propName});`);
    }

    /**
     * Given the config array primitive value, prints the code that prints it.
     * @param data The array primitive value.
     */
    private printPrimitiveArray(data: ConfigPrimitiveArray) {
        const type = this.getPrimitiveType(data[0]);
        this.print(`printf("${this.propName}: ");`);
        
        if (type === 'char*') {
            this.print(`printStringsArray(${this.propName}, ${this.propCountName});`);
        }
        else if (type === 'double') {
            this.print(`printDoubleArray(${this.propName});`);
        }
        else if (type === 'int') {
            this.print(`printIntArray(${this.propName});`);
        }
    }

    /**
     * Given the config model generates the code that prints the data config.
     * @param data The config model or one of its nested property values.
     * @param name The name of the current key.
     */
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

    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.config, 'config');
    }


}

export { ConfigPrintGenerator as generator };
