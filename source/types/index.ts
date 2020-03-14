export interface Options {
    exclude?: RegExp | RegExp[],
    extensions?: string[]
};

export interface Code {
    comment: string;
    code: string;
}

export class Generator {

    protected comment: string;
    protected code: string = '';
    
    protected print(str: string): void {
        this.code += `${str}\n`;
    }

    protected generate() {}

    constructor(protected structure: any) {}

    public get generated(): Code {
        return {
            comment: this.comment,
            code: this.code
        };
    }

}