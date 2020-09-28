import { ConfigModel, ConfigPrimitive, EConfigType, Generator, StructureModel } from '../../types';

export class ConfigGenerator extends Generator {

    protected getPrimitiveType(data: ConfigPrimitive): string {
        if (typeof data === 'string') {
            return `char*`;
        }
        else if (this.isInt(data)) {
            return `int`;
        }
        else if (this.isDouble(data)) {
            return `double`;
        }
        else {
            return '';
        }
    }

    protected getConfigType(data: any): EConfigType {
        if (Array.isArray(data)) {
            return EConfigType.ConfigArray;
        } else if (this.isString(data)) {
            return EConfigType.ConfigString;
        } else if (this.isInt(data)) {
            return EConfigType.ConfigInt;
        } else if (this.isDouble(data)) {
            return EConfigType.ConfigDouble;
        } else if (this.isObject(data)) {
            return EConfigType.ConfigObject;
        } else {
            return EConfigType.Unknown;
        }
    }
    
    protected getArrayPrimitiveType(arr: Array<any>): EConfigType {
        return arr.length === 0 ? EConfigType.Unknown : this.getConfigType(arr[0]);
    }

    protected isInt(data: any): boolean {
        return (typeof data === 'number' && data - Math.floor(data) === 0);
    }

    protected isDouble(data: any): boolean {
        return (typeof data === 'number' && data - Math.floor(data) !== 0);
    }

    protected isString(data: any): boolean {
        return (typeof data === 'string');
    }

    protected isObject(data: any): boolean {
        return (typeof data === 'object');
    }


    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
    }

}