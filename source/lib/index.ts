import * as path from 'path';

import { Options } from './types';
import { Logger } from './utils/logger';
import { checkModelsSchema } from './utils/checkModelsSchema';
import { mergeOptions } from './utils/options';
import { getCodes } from './utils/getCodes';
import { transpile } from './utils/transpile';
import getGenerators from './generators';

export { Options } from './types';

/**
 * Fetches all the template files in the given folder (files whose extension is preceded
 * by .template) and generate the code inside the special comments (such as //{{COMMENT}})
 * @param src The folder where the template files will be fetched from. The default is the current folder.
 * @param structureModel The path to the json file containing the structure model, used by generators to dynamically generate code about the data structure. The default is structure.model.json.
 * @param configModel The path to the json file containing the config model, used by generators to dynamically generate code about the config parser. The default is config.model.json.
 * @param options The options specifying things such as logging, indentation and filters on the files
 */
export function generate (src?: string, structureModel?: string, configModel?: string, options?: Options): void {
    src = src ?? process.cwd();
    structureModel = structureModel ?? path.join(process.cwd(), 'structure.model.json');
    configModel = configModel ?? path.join(process.cwd(), 'config.model.json');
    const { structureModelObject, configModelObject } = checkModelsSchema(structureModel, configModel);
    options = mergeOptions(options);

    const logger = new Logger(options);
    const generators = getGenerators(logger);
    const codes = getCodes(structureModelObject, configModelObject, generators);
    transpile(src, codes, options, logger);
}