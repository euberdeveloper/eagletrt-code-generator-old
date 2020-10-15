import * as fs from 'fs';
import { generateEverything, getTemplateFilesPath, getCorrectFileNameFromTemplate, getFileNameFromTemplate, ReferenceCode } from './testUtils';
import getGenerators from '../lib/generators';
import { Logger } from '../lib/utils/logger';

let paths = getTemplateFilesPath();
generateEverything(paths.toTestPaths);
for (let templateFilePath of paths.templateFilePaths) {
    fs.renameSync(getFileNameFromTemplate(templateFilePath), getCorrectFileNameFromTemplate(templateFilePath));
}

let referenceCode: ReferenceCode = {
    almostempty: {},
    tests: {}
};

let generators = getGenerators(new Logger({}));
for (let generator of generators) {
    let generatedEmpty = new generator({id: 'int', sessionName: 'char*', timestamp: 'long'} as any, {}).generated;
    referenceCode.almostempty[generatedEmpty.comment] = generatedEmpty.code;
}

for (const toTestPath of paths.toTestPaths) {
    let toAdd = {};
    for (let generator of generators) {
        let generated = new generator(JSON.parse(fs.readFileSync(toTestPath + '/structure.model.json', 'utf-8')), JSON.parse(fs.readFileSync(toTestPath + '/config.model.json', 'utf-8'))).generated;
        toAdd[generated.comment] = generated.code;
    }
    referenceCode.tests[toTestPath] = toAdd;
}
fs.writeFileSync('./test-assets/codereference.json', JSON.stringify(referenceCode));