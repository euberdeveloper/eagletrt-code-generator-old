/**
 * The interface of the Options object
 */
export interface Options {
    /**
     * A RegExp or an array of RegExp whose matching paths will be ignored. Default: /node_modules/
     */
    exclude?: RegExp | RegExp[];
    /**
     * An array of strings representing the extensions that will be considered. Default undefined, all extensions will be considered
     */
    extensions?: string[];
    /**
     * If the log will be shown on the terminal. Default: true
     */
    log?: boolean;
    /**
     * If the generated code will be indented the same as the comment it will substitute. Default: true
     */
    indent?: boolean;
}