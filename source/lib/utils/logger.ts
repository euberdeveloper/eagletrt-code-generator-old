import * as chalk from 'chalk';
import { Options } from "../types";

export class Logger {

    private log: boolean;

    constructor(options: Options) {
        this.log = options.log;
    }

    private formatPath(path: string): string {
        const lastSlash = path.lastIndexOf('/');
        const pre = path.slice(0, lastSlash + 1);
        const post = path.slice(lastSlash + 1);
        return `${chalk.italic.hex('#C5C8C6')(pre)}${chalk.bold.italic.blue(post)}`;
    }

    public info(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            const colouredTag = chalk.bold.blue(`[${tag || "INFO"}]`);
            const text = path ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

    public succ(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            const colouredTag = chalk.bold.green(`[${tag || "SUCCESS"}]`);
            const text = path ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

    public warn(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            const colouredTag = chalk.bold.yellow(`[${tag || "WARNING"}]`);
            const text = path ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

    public error(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            const colouredTag = chalk.bold.red(`[${tag || "ERROR"}]`);
            const text = path ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

}