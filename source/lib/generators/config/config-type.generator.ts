import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

/**
 * The ConfigTypeGenerator class, extending the ConfigGenerator class and generating the code that defines the config structure's struct.
 */
class ConfigTypeGenerator extends ConfigGenerator {

    /**
     * The current indentation as number of tabs.
     */
    private indentation = 0;
    /**
     * The array of generated structs.
     */
    private structs: string[] = [];
    /**
     * The index of the struct that is being currently generated.
     */
    private cursor = -1;

    /**
     * Prints the given string to the current cursor, formatting it.
     * @param str The string to print.
     */
    protected print(str: string): void {
        this.structs[this.cursor] += `${this.indentationTabs}${str}\n`;
    }

    /**
     * The strings of indentation tabs, dependent by the indentation field.
     */
    private get indentationTabs(): string {
        return Array(this.indentation)
            .fill('\t')
            .join('');
    }

    /**
     * Adds a new struct to the current stack.
     */
    private addStruct(): void {
        this.structs.splice(this.cursor + 1, 0, '');
    }
    
    /**
     * Given a primitive value generates the code about it.
     * @param data The primitive value.
     * @param key The name of the current key.
     */
    private parsePrimitive(data: ConfigPrimitive, key: string): void {
        this.print(`${this.getPrimitiveType(data)} ${key};`);
    }

    /**
     * Given a primitive array value generates the code about it.
     * @param data The primitive array value.
     * @param key The name of the current key.
     */
    private parsePrimitiveArray(data: ConfigPrimitiveArray, key: string): void {
        const type = this.getPrimitiveType(data[0]);
        this.print(`${type}* ${key};`);
        this.print(`int ${key}_count;`);
    }

    /**
     * Given the config model generates the code that allocates the data config.
     * @param data The config model or one of its nested property values.
     * @param name The name of the current key.
     */
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

    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_CONFIG_TYPE}}';
    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.config, 'config_t');
        this.code = this.structs.reverse().join('\n');
    }

    /**
     * The constructor of the ConfigTypeGenerator class.
     * @param structure The structure model: the generated code will not actually depend on it.
     * @param config The config model: the generated code will depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigTypeGenerator as generator };