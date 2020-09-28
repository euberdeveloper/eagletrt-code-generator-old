import { ConfigModel, EConfigType, StructureModel } from '../../types';
import { ConfigGenerator } from './configGenerator';

class ConfigTypeGenerator extends ConfigGenerator {

    private structs: string[] = [];

    private parse(data: any, name: string): void {
        let conf = `typedef struct {\n`;

        for (const k in data) {
            let type = "";

            switch (this.getConfigType(data[k])) {
                case EConfigType.ConfigArray:
                    if ((data[k] as Array<any>).length) {
                        type = this.getPrimitiveType(data[k][0]) + "*";
                        if (type != "")
                            conf += `\tint ${k}_count;\n`;
                    }
                    break;

                case EConfigType.ConfigObject:
                    type = `${k}_${name}`;
                    this.parse(data[k], type);
                    break;

                case EConfigType.ConfigString:
                case EConfigType.ConfigInt:
                case EConfigType.ConfigDouble:
                    type = this.getPrimitiveType(data[k]);
                    break;


                case EConfigType.Unknown:
                default:
                    break;
            }

            if (type != "")
                conf += `\t${type} ${k};\n`
        }

        conf += `} ${name};\n`
        this.structs.push(conf);
    }

    protected comment = '{{GENERATE_CONFIG_TYPE}}';
    protected generate(): void {
        this.parse(this.config, 'config_t');
        this.code = this.structs.join('\n');
    }

    constructor(structure: StructureModel, config: ConfigModel) {
        super(structure, config);
        this.generate();
    }

}

export { ConfigTypeGenerator as generator };
