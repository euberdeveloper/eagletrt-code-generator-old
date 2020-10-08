import * as Ajv from 'ajv';
import { readFileSync } from 'fs';

import * as structureSchema from '../schemas/structure.schema.json';
import * as configSchema from '../schemas/config.schema.json';
import { ConfigModel, StructureModel } from '../types';

export function checkModelsSchema(structureModel: string, configModel: string): { structureModelObject: StructureModel, configModelObject: ConfigModel } {
    const ajv = new Ajv();

    const structureModelObject: StructureModel = JSON.parse(readFileSync(structureModel, 'utf-8'));
    const configModelObject: ConfigModel = JSON.parse(readFileSync(configModel, 'utf-8'));

    ajv.addSchema(structureSchema, 'structure-schema');
    ajv.addSchema(configSchema, 'config-schema');

    if (!ajv.validate('structure-schema', structureModelObject)) {
        throw new Error('eagletrt-code-generator error: invalid structure model');
    }
    if (!ajv.validate('config-schema', configModelObject)) {
        throw new Error('eagletrt-code-generator error: invalid config model');
    }

    return { structureModelObject, configModelObject };
}