import { ConfigModel, StructureModel, ConfigPrimitiveArray, ConfigPrimitive } from '../../types';
import { ConfigGenerator } from './configGenerator';

/**
 * The ConfigDeallocatorGenerator class, extending the ConfigGenerator class and generating the code that deallocates a config structure.
 */
class ConfigDeallocatorGenerator extends ConfigGenerator {

    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_CONFIG_DEALLOCATOR}}';

    /**
     * The constructor of the ConfigDeallocatorGenerator class.
     * @param structure The structure model: the generated code will not actually depend on it.
     * @param config The config model: the generated code will depend on it.
     */
    public constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

    /**
     * Given a primitive array value, prints the C code that frees it.
     * @param data The primitive array value.
     */
    private freePrimitiveArray(data: ConfigPrimitiveArray): void {
        const type = this.getPrimitiveType(data[0]);
        this.print( (type === 'char*')
            ? `freeStringsArray(${this.propName}, &${this.propCountName});`
            : `free(${this.propName});`
        );
    }

    /**
     * Given the config model generates the code that deallocates the data config.
     * @param data The config model or one of its nested property values.
     * @param name The name of the current key.
     */
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

    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.config, `config`);
    }

}

export { ConfigDeallocatorGenerator as generator };