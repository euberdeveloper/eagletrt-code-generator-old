import { ConfigModel, StructureGroup, StructureMessages, StructureModel } from '../../types';
import { StructureGenerator } from './structureGenerator';

/**
 * The StructureTypeGenerator class, extending the StructureGenerator class and generating the code that defines the data structure's struct.
 */
class StructureTypeGenerator extends StructureGenerator {

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
     * The current struct name, dependent by the current keys stack.
     */
    protected get structName(): string {
        return this.keys.length === 1 ? this.keys[0] : `${this.keys.slice(1).join('_')}_data`;
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
     * Given the structure model generates the code that generates the data structure's struct.
     * @param data The structure model or one of its nested property values.
     * @param name The name of the current key.
     */
    private parse(data: StructureGroup | StructureMessages, name: string): void {
        this.addStruct();
        this.keys.push(name);
        this.cursor++;
        this.indentation = 0;
        this.print(`typedef struct {`);
        this.indentation = 1;
        for (const key in data) {
            if (Array.isArray(data[key])) {
                this.parse(data[key][0], key);
                this.print(`${this.structName} *${key};`);
                this.print(`int ${this.countName};`);
                this.print(`int ${this.sizeName};`);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.parse(data[key], key);
                this.print(`${this.structName} ${key};`);
                this.keys.pop();
            }
            else {
                this.print(`${data[key]} ${key};`);
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
    protected comment = '{{GENERATE_STRUCTURE_TYPE}}';
    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.structure, 'data_t');
        this.code = this.structs.reverse().join('\n');
    }

    /**
     * The constructor of the StructureTypeGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { StructureTypeGenerator as generator };