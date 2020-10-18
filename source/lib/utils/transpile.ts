import { readFileSync, writeFileSync } from 'fs';
import { scan, ScanOptions } from 'dree';

import { Options, Code } from '../types';
import { parseTemplate } from './parseTemplate';
import { Logger } from './logger';


/**
 * Properly transpiles the source folder, generating a file for each template file and substituting the template comment with the generated piece of code.
 * @param src The path of the directory to transpile.
 * @param codes The array of Code objects containing template comment and associated generated code.
 * @param options The options passed to the "generate" function.
 * @param logger The Logger instance.
 */
export function transpile(src: string, codes: Code[], options: Options, logger: Logger): void { 
    // Get scan options
    const scanOptions: ScanOptions = {
        exclude: options.exclude,
        extensions: options.extensions
    };

    logger.info('Generating files from templates');
    
    // Scan all the files in the directory tree of the src folder
    scan(src, scanOptions, file => {
        // If the file is a template file
        if (file.name.indexOf('.template') !== -1) {
            // Get its code
            const template = readFileSync(file.path, 'utf-8');
            // Get the transpiled code, replacing all the special comments with generated code
            const generated = parseTemplate(template, codes, options);
            // Get the path of the generated file
            const generatedPath = file.path.replace('.template', '');
            // Write the generated file
            writeFileSync(generatedPath, generated);
            
            // Log the event
            logger.succ(file.relativePath.replace('.template', ''), 'GENERATED', true);
        }
    });
}