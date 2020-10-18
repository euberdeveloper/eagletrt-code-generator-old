import * as fs from 'fs';
import * as path from 'path';

import { generateEverything, getTemplateFilesPath, getCorrectFileNameFromTemplate, getFileNameFromTemplate, ReferenceCode, testConfig } from './testUtils';
import { Logger } from '../source/lib/utils/logger';
import getGenerators from '../source/lib/generators';

const paths = getTemplateFilesPath();
generateEverything(paths.toTestPaths);
for (let templateFilePath of paths.templateFilePaths) {
    fs.renameSync(getFileNameFromTemplate(templateFilePath), getCorrectFileNameFromTemplate(templateFilePath));
}

const referenceCode: ReferenceCode = {
    almostempty: {},
    tests: {}
};

const generators = getGenerators(new Logger({}));
for (const generator of generators) {
    const generatedEmpty = new generator({id: 'int', sessionName: 'char*', timestamp: 'long'} as any, {}).generated;
    referenceCode.almostempty[generatedEmpty.comment] = generatedEmpty.code;
}

for (const toTestPath of paths.toTestPaths) {
    const toAdd = {};
    for (const generator of generators) {
        const structureModel = require(path.join(toTestPath, 'structure.model.json'));
        const configModel = require(path.join(toTestPath, 'config.model.json'));
        const generated = new generator(structureModel, configModel).generated;
        toAdd[generated.comment] = generated.code;
    }
    referenceCode.tests[toTestPath] = toAdd;
}

fs.writeFileSync(path.join(testConfig.assetsPath, 'codereference.json'), JSON.stringify(referenceCode));