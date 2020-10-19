import { assert } from 'chai';
import * as fs from 'fs';
import { getCorrectFileNameFromTemplate, getFileNameFromTemplate, generateEverything, getTemplateFilesPath, ReferenceCode, removeCodeFormatting, testConfig } from '../testUtils';
import getGenerators from '../../source/lib/generators';
import { Logger } from '../../source/lib/utils/logger';


describe('Generator', function() {

    let paths: { templateFilePaths: string[]; toTestPaths: string[]} = { templateFilePaths: [], toTestPaths: [] };
    before(function() {
        paths = getTemplateFilesPath();
    });

    after(function() {
        for (const templateFilePath of paths.templateFilePaths) {
            fs.unlinkSync(getFileNameFromTemplate(templateFilePath));
        }
    });

    const originalLogFunction = console.log;
    let output = '';
    beforeEach(function() {
        output = '';
        console.log = (msg: string) => {
            output += msg + '\n';
        };
    });

    afterEach(function() {
        console.log = originalLogFunction;
        if (this.currentTest?.state === 'failed') {
            console.log(output);
        }
    });

    
    describe('#constructor(structure: StructureModel, config: ConfigModel)', function() {

        let referenceCode: ReferenceCode = { almostempty: {}, tests: {} };
        before(function() {
            referenceCode = JSON.parse(fs.readFileSync(`${testConfig.assetsPath}/codereference.json`, 'utf-8'));
        });

        it('should get generators', function() {
            let generators = getGenerators(new Logger({}));
            let count = 0;
            for (let generator of generators) {
                const gen = new generator({id: 'int', sessionName: 'char*', timestamp: 'long'} as any, {}).generated;
                assert.isString(gen.code, 'Generated code is not a string');
                count++;
            }
            assert(count > 0, '0 generators created');
        });


        it('should generate identical formatting and code for almost empty structure and config', function() {
            const generators = getGenerators(new Logger({}));
            for (const generator of generators) {
                const gen = new generator({id: 'int', sessionName: 'char*', timestamp: 'long'} as any, {}).generated;
                assert(gen.comment ? true : false, `No comment for generator ${generator.name}`);
                if (referenceCode.almostempty[gen.comment] === undefined) {
                    assert(false, `No reference code for ${gen.comment}`);
                }
                else {
                    assert(removeCodeFormatting(referenceCode.almostempty[gen.comment]) === removeCodeFormatting(gen.code)), `${gen.comment} different from reference (Not considering formatting)`;
                    assert(referenceCode.almostempty[gen.comment] === gen.code), `${gen.comment} different from reference formatting`;
                }
            }
        });

        it('should generate identical formatting and code for test folder structures and configs', function() {

            const generators = getGenerators(new Logger({}));
            for (const toTestPath of paths.toTestPaths) {
                if (referenceCode.tests[toTestPath] === undefined) {
                    assert(false, `No reference code for ${toTestPath}`);
                }
                else {
                    for (const generator of generators) {
                        const gen = new generator(JSON.parse(fs.readFileSync(toTestPath + '/structure.model.json', 'utf-8')), JSON.parse(fs.readFileSync(toTestPath + '/config.model.json', 'utf-8'))).generated;
                        assert(gen.comment ? true : false, `No comment for generator ${generator.name}`);
                        if (referenceCode.tests[toTestPath][gen.comment] === undefined) {
                            assert(false, `No reference code for ${gen.comment} in ${toTestPath}`);
                        }
                        else {
                            assert(removeCodeFormatting(referenceCode.tests[toTestPath][gen.comment]) === removeCodeFormatting(gen.code), `${gen.comment} in ${toTestPath} different from reference (Not considering formatting)`);
                            assert(referenceCode.tests[toTestPath][gen.comment] === gen.code), `${gen.comment} in ${toTestPath} different from reference formatting`;        
                        }
                    }
                }
            }
        });

    });


    describe('#generate(src?: string, structureModel?: string, configModel?: string, options?: Options): void', function() {

        it('should generate files', function() {
            generateEverything(paths.toTestPaths);
            //CHECK
            for (const templateFilePath of paths.templateFilePaths) {
                const toCheck = getFileNameFromTemplate(templateFilePath);
                assert(fs.existsSync(toCheck), `File ${toCheck} not generated`);
            }
        });

        it('content should be identical', function() {
            for (const templateFilePath of paths.templateFilePaths) {
                const toCompare = getFileNameFromTemplate(templateFilePath);
                const asReference = getCorrectFileNameFromTemplate(templateFilePath);
                assert(fs.existsSync(toCompare), `File ${toCompare} not generated`);
                assert(fs.existsSync(asReference),  `File ${asReference} not found`);

                let formatFile = (fileName: string) => removeCodeFormatting(fs.readFileSync(fileName, 'utf8'));
                assert(formatFile(toCompare) === formatFile(asReference), `Content of ${toCompare} different from ${asReference}`);
            }
        });

        it('content and formatting should be identical', function() {
            for (const templateFilePath of paths.templateFilePaths) {
                const toCompare = getFileNameFromTemplate(templateFilePath);
                const asReference = getCorrectFileNameFromTemplate(templateFilePath);
                assert(fs.existsSync(toCompare), `File ${toCompare} not generated`);
                assert(fs.existsSync(asReference),  `File ${asReference} not found`);

                assert(fs.readFileSync(toCompare, 'utf8') === fs.readFileSync(asReference, 'utf8'), `Content or  formatting of ${toCompare} different from ${asReference}`);
            }
        });


    });

});