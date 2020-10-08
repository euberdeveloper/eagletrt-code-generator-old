import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigParserGenerator extends ConfigGenerator {

    private indentation = 0;
    private functions: string[] = [];
    private cursor = -1;
    private isRoot = true;

    private get functionParameters(): string {
        return this.isRoot 
            ? 'const jsmntok_t *json_tokens, int tokens_length, const char *json_string, config_t *config' 
            : 'const jsmntok_t *json_tokens, const char *json_string, config_t *config, int *i';
    }

    private addFunction(): void {
        this.functions.splice(this.cursor + 1, 0, '');
    }

    private get indentationTabs(): string {
        return Array(this.indentation)
            .fill('\t')
            .join('');
    }

    protected print(str: string): void {
        this.functions[this.cursor] += `${this.indentationTabs}${str}\n`;
    }

    private printFunctionFirstLines(): void {
        if (this.isRoot) {
           this.print('int _i, *i = &_i;');
           this.print('for (*i = 1; *i < tokens_length; ++(*i)) {');
           this.indentation++;
           this.isRoot = false;
        } 
        else {
            this.print('++(*i);');
            this.print('int size = json_tokens[*i].size;');
            this.print('for (int j = 0; j < size; ++j) {');
            this.indentation++;
            this.print('++(*i);');
        }
    }

    private printConditionalBlock(type: 'if' | 'else if' | 'else', condition: string | null, content: string[]): void {
        this.print(type === 'else' ? `${type} {` : `${type} (${condition}) {`);
        this.indentation++;
        content.forEach(line => this.print(line));
        this.indentation--;
        this.print('}');
    }

    private printConfigSwitchArray(data: ConfigPrimitiveArray, ifContent: string[]): void {
        const type = this.getPrimitiveType(data[0]);
        if (type === 'char*') {
            ifContent.push(...[
                `freeStringsArray(${this.propName}, &${this.propCountName});`,
                `${this.propName} = getStringArrayValue(json_tokens, json_string, &${this.propCountName}, i);`
            ]);
        }
        else {
            const capitalizedType = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
            ifContent.push(...[
                `free(${this.propName});`,
                `${this.propName} = get${capitalizedType}ArrayValue(json_tokens, json_string, &${this.propCountName}, i);`
            ]);
        }
    }

    private printConfigSwitchPrimitive(data: ConfigPrimitive, ifContent: string[]): void {
        const type = this.getPrimitiveType(data);
        if (type === 'char*') {
            ifContent.push(...[
                `free(${this.propName});`,
                `${this.propName} = getStringValue(json_tokens, json_string, i);`
            ]);
        }
        else {
            const capitalizedType = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
            ifContent.push(`${this.propName} = get${capitalizedType}Value(json_tokens, json_string, i);`);
        }
    }
    
    private printConfigSwitch(data: ConfigModel): void {
        this.print('char* key = extractString(json_tokens[*i], json_string);');

        Object.keys(data).forEach((key, index) => {
            let ifContent = [];
            if (Array.isArray(data[key])) {
                this.keys.push(key);
                this.printConfigSwitchArray(data[key] as ConfigPrimitiveArray, ifContent);
                this.keys.pop();
            }
            else if (typeof data[key] === 'object') {
                this.parse(data[key] as ConfigModel, key);
                ifContent = [`${this.functionName}(json_tokens, json_string, config, i);`];
                this.keys.pop();
            }
            else {
                this.keys.push(key);
                this.printConfigSwitchPrimitive(data[key] as ConfigPrimitive, ifContent);
                this.keys.pop();
            }
            this.indentation = 2;
            this.printConditionalBlock(index ? 'else if' : 'if', `strcmp(key, "${key}") == 0`, ifContent);
        });

        this.printConditionalBlock('else', null, [
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
        ]);
    }

    private parse(data: ConfigModel, name: string): void {
        this.addFunction();
        this.keys.push(name);
        this.cursor++;
        this.indentation = 0;
        this.print(`static void ${this.functionName}(${this.functionParameters}) {`);
        this.indentation = 1;
        this.printFunctionFirstLines();

        this.printConfigSwitch(data);

        this.indentation = 1;
        this.print('}');
        this.indentation = 0;
        this.print('}');      
        this.cursor--;  
    }

    protected comment = '{{GENERATE_CONFIG_PARSER}}';
    protected generate(): void {
        this.parse(this.config, 'config');
        this.code = this.functions.reverse().join('\n');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigParserGenerator as generator };
