/* eslint-disable @typescript-eslint/no-require-imports */
import { assert } from 'chai';
import { Code } from '../../lib/types';
import rewire = require('rewire');

import { mergeOptions } from '../../lib/utils/options';
import { parseTemplate } from './../../lib/utils/parseTemplate';
import { compareObjects } from '../testUtils';


describe('Utils', function () {

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


});