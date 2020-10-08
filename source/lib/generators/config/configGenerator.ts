import { ConfigModel, ConfigPrimitive, Generator, StructureModel } from '../../types';

export class ConfigGenerator extends Generator {

    protected keys: (string | number)[] = [];

    protected get structName(): string {
        return this.keys.length > 1 ? `${this.keys.slice(1).join('_')}_config_t` : 'config_t';
    }

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
                .reduce<string>((acc, curr, index) => acc + handleKey(curr as string), 'parse') + 'Object'
            : 'parseJsonTokens';
    }

    protected get propName(): string {
        function handleKey(key: string | number): string  {
            return typeof key === 'string' ? `.${key}` : `[${key}]`;
        }

        return this.keys
            .slice(1)
            .reduce<string>((accumulator, current) => accumulator + handleKey(current), this.keys[0] as string)
            .replace('.', '->');
    }

    protected get countName(): string {
        const last = this.keys.length - 1;
        return `${this.keys[last]}_count`;
    }
    
    protected get propCountName(): string {
        function handleKey(key: string | number): string  {
            return typeof key === 'string' ? `.${key}` : `[${key}]`;
        }

        const last = this.keys.length - 1;
        return `${this.keys.slice(1, last).reduce<string>((accumulator, current) => accumulator += handleKey(current), this.keys[0] as string)}.${this.countName}`
            .replace('.', '->');
    }

    protected getPrimitiveType(data: ConfigPrimitive): 'char*' | 'int' | 'double' {
        if (typeof data === 'string') {
            return 'char*';
        }
        else if (typeof data === 'number' && data - Math.floor(data) === 0) {
            return "int";
        }
        else if (typeof data === 'number' && data - Math.floor(data) !== 0) {
            return "double";
        }
    }

    protected getPrimitivePrintfFormatter(data: ConfigPrimitive): string {
        if (typeof data === 'string') {
            return '%s';
        }
        else if (typeof data === 'number' && data - Math.floor(data) === 0) {
            return "%d";
        }
        else if (typeof data === 'number' && data - Math.floor(data) !== 0) {
            return "%f";
        }
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
    }

}