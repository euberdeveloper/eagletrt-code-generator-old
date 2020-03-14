import * as path from 'path';

import { Options } from './types';
import { Logger } from './utils/logger';
import { mergeOptions } from './utils/options';
import { getCodes } from './utils/getCodes';
import { transpile } from './utils/transpile';
import getGenerators from './generators';

export { Options } from './types';

/**
 * Fetches all the template files in the given folder (files whose extension is preceded
 * by .template) and generate the code inside the special comments (such as //{{COMMENT}})
 * @param src The folder where the template files will be fetched from. The default is the current folder.
 * @param structure The json file containing the structure, used by generators to dynamically generate code. The default is structure.json.
 * @param options The options specifying things such as logging, indentation and filters on the files
 */
export function generate(src?: string, structure?: string, options?: Options) {
    src = src || process.cwd();
    structure = structure || path.join(process.cwd(), 'structure.json');
    options = mergeOptions(options);

    const logger = new Logger(options);
    const generators = getGenerators(logger);
    const codes = getCodes(structure, generators);
    transpile(src, codes, options, logger);
}