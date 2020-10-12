import { Code, ConfigModel, Generator, StructureModel } from "../types";

export function getCodes(structureModel: StructureModel, configModel: ConfigModel, generators: typeof Generator[]): Code[] {
    return generators
        .map(generator => new generator(structureModel, configModel))
        .map(generator => generator.generated);
}