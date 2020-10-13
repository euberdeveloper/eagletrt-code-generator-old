import { assert } from 'chai';
import * as Dree from 'dree';
import { generate } from './../../lib/index';
import * as fs from 'fs';
import { getDirToTest } from '../testUtils';



describe('Index', function () {

    describe('#generate(src?: string, structureModel?: string, configModel?: string, options?: Options): void', function () {

        it('should do everything', function () {
            //GENERATE
            const toTestPaths = getDirToTest('generate');
            for (const toTestPath of toTestPaths) {
                console.log(toTestPath);
                generate(toTestPath + '/templates', toTestPath + '/structure.model.json', toTestPath + '/config.model.json');
            }
            //CHECK
            for (const toTestPath of toTestPaths) {
                Dree.scan(toTestPath + '/templates', {}, (elem) => {

                    if (RegExp(/^.*\.template\..*$/).exec(elem.name)) {
                        const toCheck = elem.path.substring(0, elem.path.lastIndexOf('/') + 1) + elem.name.replace('.template', '');
                        assert(fs.existsSync(toCheck), `File ${toCheck} not generated`);
                    }
                });
            }

        });

    });

});