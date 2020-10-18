import { Options, Code } from '../types';

/**
 * Given the row containing the template comment and a block of generated code, returns the block properly indented in relation with the indentation of the template comment.
 * @param row The row containing the template comment.
 * @param block The block of generated code.
 * @returns The the block properly indented in relation with the indentation of the template comment.
 */
function addInitialIndentation(row: string, block: string): string {
    const indentation = row.split('//')[0];

    return block
        // Split all the rows
        .split('\n')
        // Add the indentation to the row
        .map(row => indentation + row)
        // Join all the rows
        .join('\n');
}

/**
 * Given the content of a template file, the array of Code objects containing template comment and associated generated code and the options passed to the "generate" function, returns the content of the generated file.
 * @param template The content of a template file.
 * @param codes The array of Code objects containing template comment and associated generated code.
 * @param options The options passed to the "generate" function.
 * @returns The content of file generated from the template file.
 */
export function parseTemplate(template: string, codes: Code[], options: Options): string {    
    return template
        // Split all the rows
        .split('\n')
        // Map every row
        .map(row => codes
            // Filter all the codes whose comment is in the row
            .filter(code => row.indexOf(code.comment) !== -1)
            // Map the code with the indentation
            .map(code => options.indent ? addInitialIndentation(row, code.code) : code.code)
            // Join the codes
            .join('')
        // If there are not special comments, return the unmodified row 
        || row)
        // Join all the rows
        .join('\n');
}