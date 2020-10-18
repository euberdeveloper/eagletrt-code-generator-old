import * as dree from 'dree';
import * as path from 'path';
import { generate } from '../source/lib/index';

export const testConfig = {
    assetsPath: path.join(process.cwd(), 'test', 'test-assets')
};

export function getDirToTest (folder: string): string[] {
    return dree
        .scan(path.join(testConfig.assetsPath, folder), { depth: 1 })
        .children!
        .filter(c => c.type == dree.Type.DIRECTORY)
        .map(c => c.path);
}

export function compareObjects (a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    if ((a && !b) || (!a && b)) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!compareObjects(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }

    if (typeof a !== typeof b) {
        return false;
    }

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
        dree.scan(path.join(toTestPath, 'templates'), {}, elem => {
            if (/^.*\.template\..*$/.exec(elem.name)) {
                templateFilePaths.push(elem.path);
            }
        });
    }

    return { templateFilePaths: templateFilePaths, toTestPaths: toTestPaths };
}

export function generateEverything (toTestPaths: string[]): void {
    for (const toTestPath of toTestPaths) {
        generate(path.join(toTestPath, 'templates'), path.join(toTestPath, 'structure.model.json'), path.join(toTestPath, 'config.model.json'));
    }
}

export function removeCodeFormatting(code: string) {
    return code
        .split('\n')
        .map(l => l.trim())
        .join();
} 

export interface ReferenceCode {
    almostempty: { [key: string]: string };
    tests: { [key: string]: { [key: string]: string } };
};
