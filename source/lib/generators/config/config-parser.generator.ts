
import { ConfigModel, ConfigPrimitive, ConfigPrimitiveArray, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

/**
 * The ConfigParserGenerator class, extending the ConfigGenerator class and generating the code that parses a config structure.
 */
class ConfigParserGenerator extends ConfigGenerator {

    /**
     * The current indentation as number of tabs.
     */
    private indentation = 0;
    /**
     * The array of generated functions.
     */
    private functions: string[] = [];
    /**
     * The index of the function that is being currently generated.
     */
    private cursor = -1;
    /**
     * If the current function to generate is the root one.
     */
    private isRoot = true;

    /**
     * The function parameters, depending on the isRoot field.
     */
    private get functionParameters(): string {
        return this.isRoot 
            ? 'const jsmntok_t *json_tokens, int tokens_length, const char *json_string, config_t *config' 
            : 'const jsmntok_t *json_tokens, const char *json_string, config_t *config, int *i';
    }

    /**
     * Adds a new function to the current stack.
     */
    private addFunction(): void {
        this.functions.splice(this.cursor + 1, 0, '');
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
     * Prints the given string to the current cursor, formatting it.
     * @param str The string to print.
     */
    protected print(str: string): void {
        this.functions[this.cursor] += `${this.indentationTabs}${str}\n`;
    }

    /**
     * Prints the current function's first lines.
     */
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

    /**
     * Prints a general conditional block.
     * @param type The type of the block (if; else if; else).
     * @param condition The condition to print if the block is not an else.
     * @param content The content of the conditional block.
     */
    private printConditionalBlock(type: 'if' | 'else if' | 'else', condition: string | null, content: string[]): void {
        this.print(type === 'else' ? `${type} {` : `${type} (${condition}) {`);
        this.indentation++;
        content.forEach(line => this.print(line));
        this.indentation--;
        this.print('}');
    }

    /**
     * Given a primitive array value, adds the switch-code that will handle it to the given ifContent strings array parameter.
     * @param data The primitive array value.
     * @param ifContent The ifContent that will be modified adding a new element to it.
     */
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

    /**
     * Given a primitive value, adds the switch-code that will handle it to the given ifContent strings array parameter.
     * @param data The primitive value.
     * @param ifContent The ifContent that will be modified adding a new element to it.
     */
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
    
    /**
     * Given an object value, prints the switch-code that handles it to the current function.
     * @param data The object value to handle.
     */
    private printConfigSwitch(data: ConfigModel): void {
        this.print('char* key = extractString(json_tokens[*i], json_string);');

        Object.keys(data).forEach((key, index) => {
            let ifContent: string[] = [];
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
            `\t\tbreak;`,
            `\tcase JSMN_OBJECT:`,
            `\t\t*i += 2 * token.size;`,
            `\t\tbreak;`,
            `}`
        ]);
    }

    /**
     * Given a config model, prints the function that handles it.
     * @param data The config model or one of its nested objects.
     * @param name The current key.
     */
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

    /**
     * The template comment that this generator handles.
     */
    protected comment = '{{GENERATE_CONFIG_PARSER}}';
    /**
     * The function that generates the code and assigns it to the code field.
     */
    protected generate(): void {
        this.parse(this.config, 'config');
        this.code = this.functions.reverse().join('\n');
    }

    /**
     * The constructor of the ConfigParserGenerator class.
     * @param structure The structure model: the generated code will depend on it.
     * @param config The config model: the generated code will not actually depend on it.
     */
    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigParserGenerator as generator };
