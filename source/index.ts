import * as path from 'path';
import { Options } from './interfaces';
import { mergeOptions } from './utils/options';

export function generate(src?: string, structure?: string, options?: Options) {
    src = src || process.cwd();
    structure = structure || path.join(process.cwd(), 'structure.json');
    options = mergeOptions(options);

    
}