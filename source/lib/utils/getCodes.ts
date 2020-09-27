import { readFileSync } from 'fs';

import { Code, ConfigModel, Generator, StructureModel } from "../types";

export function getCodes(structurePath: string, configPath: string, generators: typeof Generator[]): Code[] {
    const structureModel: StructureModel = JSON.parse(readFileSync(structurePath, 'utf-8'));
    const configModel: ConfigModel = JSON.parse(readFileSync(configPath, 'utf-8'));
    
    return generators
        .map(generator => new generator(structureModel, configModel))
        .map(generator => generator.generated);
}