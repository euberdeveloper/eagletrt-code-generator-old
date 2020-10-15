/* eslint-disable @typescript-eslint/no-require-imports */
import { assert } from 'chai';
import { Code } from '../../lib/types';
import rewire = require('rewire');
import * as fs from 'fs';

import * as Dree from 'dree';
import { mergeOptions } from '../../lib/utils/options';
import { parseTemplate } from './../../lib/utils/parseTemplate';
import { compareObjects, getTemplateFilesPath, testConfig } from '../testUtils';
import { checkModelsSchema } from '../../lib/utils/checkModelsSchema';


describe('Utils', function () {

    let paths: { templateFilePaths: string[]; toTestPaths: string[]} = { templateFilePaths: [], toTestPaths: [] };
    before(function () {
        paths = getTemplateFilesPath();
    });

    const originalLogFunction = console.log;
    let output = '';
    beforeEach(() => {
        output = '';
        console.log = (msg: string) => {
            output += msg + '\n';
        };
    });

    afterEach(function () {
        console.log = originalLogFunction;
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        if (this.currentTest?.state === 'failed') {
            console.log(output);
        }
    });

    describe('parseTemplate', () => {

        describe('#parseTemplate(template: string, codes: Code[], options: Options): string', function () {
            it('should transpile everything', function () {

                const templates = [
                    'line1\n\t\t// {{TAG1}}\nline3\n// {{TAG3}}\n// {{TAG2}}\n// {{TAG4}}',
                    '\n\n\n\n',
                    '',
                    '// {{TAG1}}\t\n\t'
                ];
                const templatesExpected = [
                    'line1\n\t\tCode1\n\t\tCode1\n\t\tCode11\nline3\na\n\n\n\t',
                    '\n\n\n\n',
                    '',
                    'Code1\nCode1\nCode11\n\t'
                ];
                const codes: Code[] = [{
                    comment: 'TAG1',
                    code: 'Code1\nCode1\nCode11'
                }, {
                    comment: 'TAG2',
                    code: '\n'
                }, {
                    comment: 'TAG3',
                    code: 'a' //TODO: vuoto non funziona
                }, {
                    comment: 'TAG4',
                    code: '\t'
                }];

                for (let i = 0; i < templates.length; i++) {
                    const res = parseTemplate(templates[i], codes, { indent: true });
                    assert(res === templatesExpected[i],
                        `Error on template ${i}.Should be ${JSON.stringify(templatesExpected[i])}, is ${res}`);
                }

            });
        });

    });

    describe('options', () => {

        describe('#mergeOptions(options: Options): Options', function () {
            const DEFAULT_OPTIONS = rewire('../../lib/utils/options').__get__('DEFAULT_OPTIONS');

            it('should get default option', function () {
                assert(compareObjects(DEFAULT_OPTIONS, mergeOptions({})), 'Object different');
            });

            it('should overide default option', function () {
                const res1 = mergeOptions({ log: false });
                const expected1: any = {};
                Object.assign(expected1, DEFAULT_OPTIONS).log = false;
                const res2 = mergeOptions({ log: true });
                const expected2: any = {};
                Object.assign(expected2, DEFAULT_OPTIONS).log = true;
                assert(compareObjects(res1, expected1) && compareObjects(res2, expected2), 'Property not overriden');
            });
        });

    });


    describe('checkModelsSchema', () => {

        describe('#checkModelsSchema(structureModel: string, configModel: string): { structureModelObject: StructureModel, configModelObject: ConfigModel }', function () {

            it('should validate correct model schemas', function () {
                for (let path of paths.toTestPaths) {
                    try {
                        checkModelsSchema(path + '/structure.model.json', path + '/config.model.json');
                    } catch (error) {
                        assert(false, `Model ${path} not validated`)                        
                    }
                }
            });

            it('should not validate incorrect model schemas', function () {

                let incorrectJsonDirs: string[] = [];
                Dree.scan(`${testConfig.assetsPath}/invalid-json`, { depth: 1 }, () => { }, (dir) => {
                    incorrectJsonDirs.push(dir.path);
                });
                for (let path of incorrectJsonDirs) {
                    try {
                        checkModelsSchema(path + '/structure.model.json', path + '/config.model.json');
                        assert(false, `Invalid model ${path} validated`);
                    } catch (error) {
                    }
                }
            });
        });

    });

});