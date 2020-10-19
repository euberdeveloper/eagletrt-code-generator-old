import { assert } from 'chai';
import { Code } from '../../source/lib/types';
import rewire = require('rewire');

import * as dree from 'dree';
import { mergeOptions } from '../../source/lib/utils/options';
import { parseTemplate } from './../../source/lib/utils/parseTemplate';
import { compareObjects, getTemplateFilesPath, testConfig } from '../testUtils';
import { checkModelsSchema } from '../../source/lib/utils/checkModelsSchema';
import { Logger } from '../../source/lib/utils/logger';
import * as chalk from 'chalk';


describe('Utils', function() {

    let paths: { templateFilePaths: string[]; toTestPaths: string[]} = { templateFilePaths: [], toTestPaths: [] };
    before(function() {
        paths = getTemplateFilesPath();
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

    describe('logger', function() {


        it('should not log', function() {
            console.log = (log) => {
                assert(false, `Should not log anything, but "${JSON.stringify(log)}" was logged`);
            };

            const logger = new Logger({ log: false });
            logger.succ('Test');
            logger.warn('Test');
            logger.info('Test');
            logger.error('Test');
        });

        it('should log', function() {
            const logger = new Logger({ log: true });
            let res = '';

            console.log = (log) => {
                assert(JSON.stringify(log) === JSON.stringify(res), `Logged ${JSON.stringify(log)} instead of ${JSON.stringify(res)}`);
            };

            res = `${chalk.bold.red('[TAG1]')} test`;
            logger.error('test', 'TAG1', false);
            res = `${chalk.bold.green('[TAG1]')} test`;
            logger.succ('test', 'TAG1', false);
            res = `${chalk.bold.yellow('[TAG1]')} test`;
            logger.warn('test', 'TAG1', false);
            res = `${chalk.bold.blue('[TAG1]')} test`;
            logger.info('test', 'TAG1', false);

            res = `${chalk.bold.red('[ ]')} `;
            logger.error('', ' ', false);
            res = `${chalk.bold.green('[ ]')} `;
            logger.succ('', ' ', false);
            res = `${chalk.bold.yellow('[ ]')} `;
            logger.warn('', ' ', false);
            res = `${chalk.bold.blue('[ ]')} `;
            logger.info('', ' ', false);

            res = `${chalk.bold.red('[ERROR]')} `;
            logger.error('', undefined, false);
            res = `${chalk.bold.green('[SUCCESS]')} `;
            logger.succ('', undefined, false);
            res = `${chalk.bold.yellow('[WARNING]')} `;
            logger.warn('', undefined, false);
            res = `${chalk.bold.blue('[INFO]')} `;
            logger.info('', undefined, false);

            res = `${chalk.bold.red('[ERROR]')} ${chalk.bold.italic.blue('test.txt')}`;
            logger.error('test.txt', undefined, true);
            res = `${chalk.bold.green('[SUCCESS]')} ${chalk.bold.italic.blue('test.txt')}`;
            logger.succ('test.txt', undefined, true);
            res = `${chalk.bold.yellow('[WARNING]')} ${chalk.bold.italic.blue('test.txt')}`;
            logger.warn('test.txt', undefined, true);
            res = `${chalk.bold.blue('[INFO]')} ${chalk.bold.italic.blue('test.txt')}`;
            logger.info('test.txt', undefined, true);

            res = `${chalk.bold.red('[ERROR]')} ${chalk.italic.hex('#C5C8C6')('path/')}${chalk.bold.italic.blue('test.txt')}`;
            logger.error('path/test.txt', undefined, true);
            res = `${chalk.bold.green('[SUCCESS]')} ${chalk.italic.hex('#C5C8C6')('path/')}${chalk.bold.italic.blue('test.txt')}`;
            logger.succ('path/test.txt', undefined, true);
            res = `${chalk.bold.yellow('[WARNING]')} ${chalk.italic.hex('#C5C8C6')('path/')}${chalk.bold.italic.blue('test.txt')}`;
            logger.warn('path/test.txt', undefined, true);
            res = `${chalk.bold.blue('[INFO]')} ${chalk.italic.hex('#C5C8C6')('path/')}${chalk.bold.italic.blue('test.txt')}`;
            logger.info('path/test.txt', undefined, true);
        });

    });


    describe('parseTemplate', function() {

        describe('#parseTemplate(template: string, codes: Code[], options: Options): string', function() {
            it('should transpile everything', function() {

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

    describe('options', function() {

        describe('#mergeOptions(options: Options): Options', function() {
            const DEFAULT_OPTIONS = rewire('../../source/lib/utils/options').__get__('DEFAULT_OPTIONS');

            it('should get default option', function() {
                assert(compareObjects(DEFAULT_OPTIONS, mergeOptions({})), 'Object different');
            });

            it('should overide default option', function() {
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


    describe('checkModelsSchema', function() {

        describe('#checkModelsSchema(structureModel: string, configModel: string): { structureModelObject: StructureModel, configModelObject: ConfigModel }', function() {

            it('should validate correct model schemas', function() {
                for (let path of paths.toTestPaths) {
                    try {
                        checkModelsSchema(path + '/structure.model.json', path + '/config.model.json');
                    }
                    catch (error) {
                        assert(false, `Model ${path} not validated`);                        
                    }
                }
            });

            it('should not validate incorrect model schemas', function() {

                let incorrectJsonDirs: string[] = [];
                dree.scan(`${testConfig.assetsPath}/invalid-json`, { depth: 1 }, undefined, (dir) => {
                    incorrectJsonDirs.push(dir.path);
                });
                for (let path of incorrectJsonDirs) {
                    try {
                        checkModelsSchema(path + '/structure.model.json', path + '/config.model.json');
                        assert(false, `Invalid model ${path} validated`);
                    }
                    catch (error) {
                    }
                }
            });
        });

    });

});