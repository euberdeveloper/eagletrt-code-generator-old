import { ConfigModel, EConfigType, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigDeAllocatorGenerator extends ConfigGenerator {

    private freeLine: string[] = [];

    private addFreeLine(propName: string, isStringArray = false): void {
        this.freeLine.push(
            isStringArray ? `freeStringsArray(${propName}, &${propName}_count);` : `free(${propName});`
        );
    }

    private parse(data: ConfigModel, name: string): void {
        for (const k in data) {
            switch (this.getConfigType(data[k])) {
                case EConfigType.ConfigArray:
                    this.addFreeLine(`${name}${k}`, this.getArrayPrimitiveType(data[k] as Array<any>) === EConfigType.ConfigString)
                    break;

                case EConfigType.ConfigObject:
                    this.parse(data[k] as ConfigModel, `${name}${k}.`)
                    break;

                case EConfigType.ConfigString:
                    this.addFreeLine(`${name}${k}`)
                    break;

                case EConfigType.ConfigInt:
                case EConfigType.ConfigDouble:
                case EConfigType.Unknown:
                default:
                    break;
            }
        }
    }

    protected comment = '{{GENERATE_CONFIG_DEALLOCATOR}}';
    protected generate(): void {
        this.parse(this.config, 'config->');
        this.code = this.freeLine.map(s => "\t" + s).join('\n');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigDeAllocatorGenerator as generator };
