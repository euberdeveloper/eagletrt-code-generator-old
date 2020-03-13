import { Options } from '../interfaces';

const DEFAULT_OPTIONS: Options = {
    exclude: 'node_modules'
};

export function mergeOptions(options: Options): Options {
    const merged: Options = {};
    options = options || {};

    for (const key in DEFAULT_OPTIONS) {
        merged[key] = options[key] === undefined ? DEFAULT_OPTIONS[key] : options[key];
    }

    if (typeof merged.exclude === 'string') {
        merged.exclude = [merged.exclude];
    }
    
    return merged;
}