import { Options } from '../types';

const DEFAULT_OPTIONS: Options = {
    exclude: /node_modules/,
    extensions: undefined,
    log: true,
    indent: true
};

export function mergeOptions(options?: Options): Options {
    const merged: Options = {};
    options = options || {};

    for (const key in DEFAULT_OPTIONS) {
        merged[key] = options[key] === undefined ? DEFAULT_OPTIONS[key] : options[key];
    }
    
    return merged;
}