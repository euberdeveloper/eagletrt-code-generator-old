import * as path from 'path';

import { Options } from './types';
import { Logger } from './utils/logger';
import { mergeOptions } from './utils/options';
import { getCodes } from './utils/getCodes';
import { transpile } from './utils/transpile';
import getGenerators from './generators';


export function generate(src?: string, structure?: string, options?: Options) {
    src = src || process.cwd();
    structure = structure || path.join(process.cwd(), 'structure.json');
    options = mergeOptions(options);

    const logger = new Logger(options);
    const generators = getGenerators(logger);
    const codes = getCodes(structure, generators);
    transpile(src, codes, options, logger);
}

generate('./shit');