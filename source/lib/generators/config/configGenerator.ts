import { ConfigModel, ConfigPrimitive, Generator, StructureModel } from '../../types';

/**
 * The ConfigGenerator class, extending the Generator class and giving a blueprint for all the generators regarding the config.
 */
export class ConfigGenerator extends Generator {

    /**
     * A stack of inspected keys.
     */
    protected keys: (string | number)[] = [];

    /**
     * The constructor of the ConfigGenerator class.
     * @param structure The structure model: the generated code will not actually depend on it.
     * @param config The config model: the generated code will depend on it.
     */
    public constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
    }

    /**
     * Given the current inspected keys, returns the name of the associated struct.
     */
    protected get structName(): string {
        return this.keys.length > 1 ? `${this.keys.slice(1).join('_')}_config_t` : 'config_t';
    }

    /**
     * Given the current inspected keys, returns the name of parsing functions.
     */
    protected get functionName(): string {
        function handleKey(key: string): string  {
            for (let i = key.indexOf('_'); i !== -1; i = key.indexOf('_')) {
                key = i !== key.length - 1
                    ? key.slice(0, i) + key.charAt(i + 1).toUpperCase() + key.slice(i + 2, key.length)
                    : key;
            }

            return `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        }

        return this.keys.length > 1
            ? this.keys
                .slice(1)
                .filter(key => typeof key === 'string')
                .reduce<string>((acc, curr) => acc + handleKey(curr as string), 'parse') + 'Object'
            : 'parseJsonTokens';
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property.
     */
    protected get propName(): string {
        function handleKey(key: string | number): string  {
            return typeof key === 'string' ? `.${key}` : `[${key}]`;
        }

        return this.keys
            .slice(1)
            .reduce<string>((accumulator, current) => accumulator + handleKey(current), this.keys[0].toString())
            .replace('.', '->');
    }

    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _count at the end and keeping only the last key.
     */
    protected get countName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_count`;
    }
    
    /**
     * Given the current inspected keys, returns the string that in c access that property, adding _count at the end.
     */
    protected get propCountName(): string {
        function handleKey(key: string | number): string  {
            return typeof key === 'string' ? `.${key}` : `[${key}]`;
        }

        const last = this.keys.length - 1;
        return `${this.keys.slice(1, last).reduce<string>((accumulator, current) => accumulator += handleKey(current), this.keys[0].toString())}.${this.countName}`
            .replace('.', '->');
    }

    /**
     * Given a primitive value, returns its C type.
     * @param data The primitive value to analyze.
     * @returns The associated C type.
     */
    protected getPrimitiveType(data: ConfigPrimitive): 'char*' | 'int' | 'double' | '' {
        if (typeof data === 'string') {
            return 'char*';
        }
        else if (typeof data === 'number' && data - Math.floor(data) === 0) {
            return 'int';
        }
        else if (typeof data === 'number' && data - Math.floor(data) !== 0) {
            return 'double';
        }
        else {
            return '';
        }
    }

    /**
     * Given a primitive value, returns its associated C printf formatter (such as %d or %s).
     * @param data The primitive value to analyze.
     * @returns The associated C printf formatter.
     */
    protected getPrimitivePrintfFormatter(data: ConfigPrimitive): string {
        if (typeof data === 'string') {
            return '%s';
        }
        else if (typeof data === 'number' && data - Math.floor(data) === 0) {
            return '%d';
        }
        else if (typeof data === 'number' && data - Math.floor(data) !== 0) {
            return '%f';
        }
        else {
            return '';
        }
    }

}