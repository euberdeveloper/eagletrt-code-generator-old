import { Options } from '../types';

/**
 * The default options, merged with the given options to assign the value to the not-specified properties.
 */
const DEFAULT_OPTIONS: Options = {
    exclude: /node_modules/,
    extensions: undefined,
    log: true,
    indent: true
};

/**
 * Given the passed options, assigns the value to the not-specified properties by merging them with the default options.
 * @param options The passed options.
 * @returns The merged options.
 */
export function mergeOptions(options?: Options): Options {
    const merged: Options = {};
    options = options || {};

    for (const key in DEFAULT_OPTIONS) {
        merged[key] = options[key] === undefined ? DEFAULT_OPTIONS[key] : options[key];
    }
    
    return merged;
}