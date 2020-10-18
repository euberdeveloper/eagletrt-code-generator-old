import { ConfigModel, StructureModel, ConfigPrimitiveArray, ConfigPrimitive } from '../../types';
import { ConfigGenerator } from './configGenerator';

/**
 * The ConfigAllocatorGenerator class, extending the ConfigGenerator class and generating the code that allocates a config structure.
 */
class ConfigAllocatorGenerator extends ConfigGenerator {

    /**
     * Given the config primitive value, prints the code that allocates it.
     * @param data The primitive value.
     */
    private parsePrimitive(defaultValue: ConfigPrimitive): void {
        const type = this.getPrimitiveType(defaultValue);
        const handledDefaultValue = (type === 'char*') ? `strdup("${defaultValue}")` : defaultValue;
        this.print(`${this.propName} = ${handledDefaultValue};`);
    }

    /**
     * Given the config array primitive value, prints the code that allocates it.
     * @param data The array primitive value.
     */
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

    /**
     * Given the config model generates the code that allocates the data config.
     * @param data The config model or one of its nested property values.
     * @param name The name of the current key.
     */
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

    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_CONFIG_ALLOCATOR}}';
    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.config, `config`);
    }

    /**
     * The constructor of the ConfigAllocatorGenerator class.
     * @param structure The structure model: the generated code will not actually depend on it.
     * @param config The config model: the generated code will depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }
}

export { ConfigAllocatorGenerator as generator };