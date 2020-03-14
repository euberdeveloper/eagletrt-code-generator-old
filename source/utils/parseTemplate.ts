import { Code } from '../types';

function addInitialIndentation(row: string, block: string) {
    const length = row.split('//')[0].length;
    const indentation = Array(length).fill(' ');

    return block
        // Split all the rows
        .split('\n')
        // Add the indentation to the row
        .map(row => indentation + row)
        // Join all the rows
        .join('\n');
}

export function parseTemplate(template: string, codes: Code[]): string {
    return template
        // Split all the rows
        .split('\n')
        // Map every row
        .map(row => codes
            // Filter all the codes whose comment is in the row
            .filter(code => row.indexOf(code.comment) !== -1)
            // Map the code with the indentation
            .map(code => addInitialIndentation(row, code.code))
            // Join the codes
            .join('')
        // If there are not special comments, return the unmodified row 
        || row)
        // Join all the rows
        .join('\n');
}