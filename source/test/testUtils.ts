import * as Dree from 'dree';
import { generate } from '../lib/index';

export const testConfig = {
    assetsPath: './test-assets'
};

export function getDirToTest (folder: string): string[] {
    return Dree.scan(`${testConfig.assetsPath}/${folder}`, { depth: 1 }).children!.filter(c => c.type == Dree.Type.DIRECTORY).map(c => c.path);
}

export function compareObjects (a: any, b: any): boolean {
    if (a === b)
        return true;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if ((a && !b) || (!a && b))
        return false;
        
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (!compareObjects(a[i], b[i]))
                return false;
        return true;
    }

    if (typeof a !== typeof b)
        return false;

    if (typeof a === 'object') {
        for (const k in a) {
            if (!compareObjects(a[k], b[k]))
                return false;
        }
    }

    return true;
}

export function getFileNameFromTemplate (templateFileName: string): string {
    return templateFileName.replace('.template', '');
}

export function getCorrectFileNameFromTemplate (templateFileName: string): string {
    return templateFileName.replace('.template', '.correct');
}

export function getTemplateFilesPath (): { templateFilePaths: string[]; toTestPaths: string[]} {
    const templateFilePaths: string[] = [];
    const toTestPaths = getDirToTest('generate');
    for (const toTestPath of toTestPaths) {
        Dree.scan(toTestPath + '/templates', {}, (elem) => {
            if (RegExp(/^.*\.template\..*$/).exec(elem.name)) {
                templateFilePaths.push(elem.path);
            }
        });
    }

    return { templateFilePaths: templateFilePaths, toTestPaths: toTestPaths };
}

export function generateEverything (toTestPaths: string[]): void {
    for (const toTestPath of toTestPaths) {
        generate(toTestPath + '/templates', toTestPath + '/structure.model.json', toTestPath + '/config.model.json');
    }
}

export function removeCodeFormatting(code: string) {
    return code.split('\n').map(l => l.trim()).join();

} 

export type ReferenceCode = {
    almostempty: { [key: string]: string };
    tests: { [key: string]: { [key: string]: string } };
};
