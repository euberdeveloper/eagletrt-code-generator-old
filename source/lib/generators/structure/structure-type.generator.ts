import { StructureGenerator } from './structureGenerator';

class StructureTypeGenerator extends StructureGenerator {

    private indentation = 0;
    private structs: string[] = [];
    private cursor = -1;

    protected print(str: string): void {
        this.structs[this.cursor] += `${this.indentationTabs}${str}\n`;
    }

    protected get structName(): string {
        return this.keys.length === 1 ? this.keys[0] : `${this.keys.slice(1).join('_')}_data`;
    }

    private get indentationTabs(): string {
        return Array(this.indentation)
            .fill('\t')
            .join('');
    }

    private addStruct(): void {
        this.structs.splice(this.cursor + 1, 0, '');
    }

    private parse(data: any, name: string): void {
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

    protected comment = '{{GENERATE_STRUCTURE_TYPE}}';
    protected generate(): void {
        this.parse(this.structure, 'data_t');
        this.code = this.structs.reverse().join('\n');
    }

    constructor(structure: any) {
        super(structure);
        this.generate();
    }

}

export { StructureTypeGenerator as generator };