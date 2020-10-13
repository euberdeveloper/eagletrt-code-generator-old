import * as Dree from 'dree';

export const testConfig = {
    assetsPath: './test-assets'
};

export function getDirToTest (folder: string): string[] {
    console.log(`${testConfig.assetsPath}/${folder}`);
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