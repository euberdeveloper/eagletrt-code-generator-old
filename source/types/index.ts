/**
 * The interface of the Options object
 */
export interface Options {
    /**
     * A RegExp or an array of RegExp whose matching paths will be ignored. Default: /node_modules/
     */
    exclude?: RegExp | RegExp[];
    /**
     * An array of string representing the extensions that will be considered. Default undefined, all extensions will be considered
     */
    extensions?: string[];
    /**
     * If the log will be shown on the terminal
     */
    log?: boolean;
    /**
     * If the generated code will be indented the same as the comment it will substitute
     */
    indent?: boolean;
};

export interface Code {
    comment: string;
    code: string;
}

export class Generator {

    protected comment: string;
    protected code = '';
    
    protected print(str: string): void {
        this.code += `${str}\n`;
    }

    protected generate(): void {}

    constructor(protected structure: any) {}

    public get generated(): Code {
        return {
            comment: this.comment,
            code: this.code
        };
    }

}