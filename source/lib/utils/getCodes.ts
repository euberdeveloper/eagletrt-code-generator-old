import { Code, ConfigModel, Generator, StructureModel } from '../types';

/**
 * Given the models and the generators, returns an array of all the comment and associated code couples.
 * @param structureModel The structure model given to the generators constructors.
 * @param configModel The config model given to the generators constructors.
 * @param generators The generators classes.
 * @returns Returns an array of Code objects, containing the comment and the associated generated code.
 */
export function getCodes(structureModel: StructureModel, configModel: ConfigModel, generators: typeof Generator[]): Code[] {
    return generators
        .map(generator => new generator(structureModel, configModel))
        .map(generator => generator.generated);
}