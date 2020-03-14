import { readFileSync } from 'fs';

import { Code, Generator } from "../types";

export function getCodes(structurePath: string, generators: typeof Generator[]): Code[] {
    const structure: any = JSON.parse(readFileSync(structurePath, 'utf-8'));
    
    return generators
        .map(generator => new generator(structure))
        .map(generator => generator.generated);
}