import { ConfigModel, EConfigType, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigAllocatorGenerator extends ConfigGenerator {

    private structs: string[] = [];

    private codeLine(c: string): string {
        return `\t${c}\n`;
    }

    private parse(data: ConfigModel, name: string): void {
        let code = "";

        for (const k in data) {
            switch (this.getConfigType(data[k])) {
                case EConfigType.ConfigArray:
                    code += this.codeLine(`${name}${k}_count = ${(data[k] as Array<string>).length};`)
                    code += this.codeLine(`${name}${k} = (char**) malloc(sizeof(char*) * ${name}${k}_count);`);
                    const arrType = this.getArrayPrimitiveType(data[k] as Array<any>);
                    for (let i = 0; i < (data[k] as Array<string>).length; i++) {
                        if (arrType === EConfigType.ConfigString)
                            code += this.codeLine(`${name}${k}[${i}] = strdup("${data[k][i]}");`);
                        else if (arrType === EConfigType.ConfigInt || arrType === EConfigType.ConfigDouble)
                            code += this.codeLine(`${name}${k}[${i}] = ${data[k][i]};`);
                    }
                    code += '\n';
                    break;

                case EConfigType.ConfigObject:
                    this.parse(data[k] as ConfigModel, `${name}${k}.`);
                    break;

                case EConfigType.ConfigString:
                    code += this.codeLine(`${name}${k} = strdup("${data[k]}");`);
                    break;

                case EConfigType.ConfigInt:
                case EConfigType.ConfigDouble:
                    code += this.codeLine(`${name}${k} = ${data[k].toString()};`);
                    break;

                case EConfigType.Unknown:
                default:
                    break;
            }
        }

        this.structs.push(code);
    }

    protected comment = '{{GENERATE_CONFIG_ALLOCATOR}}';
    protected generate(): void {
        const name = "config";
        this.parse(this.config, `${name}->`);
        this.code = `\tconfig_t *${name} = (config_t*) malloc(sizeof(config_t));\n\n`
            + this.structs.join('\n') + "\n"
            + `\treturn ${name};\n`;
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }
}

export { ConfigAllocatorGenerator as generator };