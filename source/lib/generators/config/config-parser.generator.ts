import { ConfigModel, EConfigType, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigParserGenerator extends ConfigGenerator {

    private methods: string[] = [];

    private printLine(code: string, indentation = 0): string {
        return `${Array(indentation).fill('\t').join('')}${code}\n`;
    }

    private printIf(condition: string, content: string[], indentation = 0, elseIf = false, onlyElse = false): string {
        return this.printLine(`${elseIf ? 'else ' : ''}${onlyElse ? '' : `if (${condition}) `}{`, indentation++)
            + content.map(line => this.printLine(line, indentation)).join("")
            + this.printLine("}", --indentation);
    }

    private getFunctionName(objName: string, isRoot = false): string {
        return isRoot ? `parseJsonTokens` : `parse${objName.charAt(0).toUpperCase()}${objName.slice(1)}Object`;
    }

    private mainIfSwitchGenerator(data: ConfigModel, prefixName: string, objName: string, indentation: number): string {
        let code = this.printLine("char* key = extractString(json_tokens[*i], json_string);", indentation);

        let first = true;
        for (const k in data) {
            let ifContent: string[] = [];

            switch (this.getConfigType(data[k])) {
                case EConfigType.ConfigArray:
                    switch (this.getArrayPrimitiveType((data[k] as Array<any>))) {
                        case EConfigType.ConfigString:
                            ifContent = [
                                `freeStringsArray(config${prefixName}${k}, &config${prefixName}${k}_count);`,
                                `config${prefixName}${k} = getArrayValue(json_tokens, json_string, &config${prefixName}${k}_count, i);`
                            ]
                            break;

                        //TODO: implement C for non string array

                        case EConfigType.Unknown:
                        default:
                            break;
                    }
                    break;

                case EConfigType.ConfigObject:
                    ifContent = [
                        `${this.getFunctionName(k)}(json_tokens, json_string, config, i);`
                    ]
                    this.parse(data[k] as ConfigModel, `${prefixName}${k}.`, k, false);
                    break;

                case EConfigType.ConfigString:
                    ifContent = [
                        `free(config${prefixName}${k});`,
                        `config${prefixName}${k} = getStringValue(json_tokens, json_string, i);`
                    ]
                    break;

                case EConfigType.ConfigInt:
                    ifContent = [
                        `config${prefixName}${k} = getIntValue(json_tokens, json_string, i);`
                    ]
                    break;

                case EConfigType.ConfigDouble:
                    ifContent = [
                        `config${prefixName}${k} = getDoubleValue(json_tokens, json_string, i);`
                    ]
                    break;

                case EConfigType.Unknown:
                default:
                    break;
            }

            code += this.printIf(`strcmp(key, "${k}") == 0`, ifContent, indentation, !first);
            first = false;
        }

        code += this.printIf("", [
            `++(*i);`,
            `jsmntok_t token = json_tokens[*i];`,
            `switch (token.type)`,
            `{`,
            `\tcase JSMN_ARRAY:`,
            `\t\t*i += token.size;`,
            `\t\tbreak;`, ,
            `\tcase JSMN_OBJECT:`,
            `\t\t*i += 2 * token.size;`,
            `\t\tbreak;`,
            `}`
        ], indentation, true, true);

        return code;
    }

    private parse(data: ConfigModel, prefixName: string, objName: string, isRootObject = false): void {
        let indentation = 0;

        let code = this.printLine(`static void ${this.getFunctionName(objName, isRootObject)}(const jsmntok_t *json_tokens, const char *json_string, config_t *config, ${isRootObject ? `int tokens_length` : `int *i`}) {`, indentation++);

        if (!isRootObject) {
            code += this.printLine(`++(*i);`, indentation);
            code += this.printLine(`int size = json_tokens[*i].size;`, indentation);
            code += this.printLine(`for (int j = 0; j < size; ++j) {`, indentation++);
            code += this.printLine(`++(*i);`, indentation);
        } else {
            code += this.printLine(`for (int* i = 1; i < tokens_length; ++(*i)) {`, indentation++);
        }

        code += this.mainIfSwitchGenerator(data, prefixName, objName, indentation);
        code += this.printLine(`}`, --indentation);
        code += this.printLine(`}`, --indentation);

        this.methods.push(code);
    }

    protected comment = '{{GENERATE_CONFIG_PARSER}}';
    protected generate(): void {
        this.parse(this.config, '->', `config`, true);
        this.code = this.methods.join('\n');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigParserGenerator as generator };
