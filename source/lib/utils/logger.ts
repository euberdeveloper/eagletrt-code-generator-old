import * as chalk from 'chalk';
import { Options } from '../types';

/**
 * The logger class, used in the package to format the logs.
 */
export class Logger {

    /**
     * If false, the log will not be logged.
     */
    private readonly log: boolean;

    /**
     * The constructor of the Logger class.
     * @param options The options given to the "generate" function. Used to determine the value of the field log.
     */
    public constructor(options: Options) {
        this.log = options.log ?? true;
    }

    /**
     * Given a path string, formattes its style and returns it formatted.
     * @param path The path string to format.
     * @returns The formatted string
     */
    private formatPath(path: string): string {
        const lastSlash = path.lastIndexOf('/');
        const pre = path.slice(0, lastSlash + 1);
        const post = path.slice(lastSlash + 1);
        return `${chalk.italic.hex('#C5C8C6')(pre)}${chalk.bold.italic.blue(post)}`;
    }

    /**
     * If the log field is true, logs a formatted info message.
     * @param str The message to log.
     * @param tag An optional tag specifying the context of the log. Default vaue is "INFO".
     * @param path If the message to log should be formatted as path.
     */
    public info(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            //TODO: fix eslint error
            // const colouredTag = chalk.bold.blue(`[${tag || 'INFO'}]`);
            const colouredTag = chalk.bold.blue(`[${tag ?? 'INFO'}]`);
            // const text = path ? this.formatPath(str) : str;
            const text = (path ?? false) ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

    /**
     * If the log field is true, logs a formatted success message.
     * @param str The message to log.
     * @param tag An optional tag specifying the context of the log. Default vaue is "SUCCESS".
     * @param path If the message to log should be formatted as path.
     */
    public succ(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            // TODO: fix eslint error
            //const colouredTag = chalk.bold.green(`[${tag || 'SUCCESS'}]`);
            const colouredTag = chalk.bold.green(`[${tag ?? 'SUCCESS'}]`);
            const text = (path ?? false) ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

    /**
     * If the log field is true, logs a formatted warning message.
     * @param str The message to log.
     * @param tag An optional tag specifying the context of the log. Default vaue is "WARNING".
     * @param path If the message to log should be formatted as path.
     */
    public warn(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            const colouredTag = chalk.bold.yellow(`[${tag ?? 'WARNING'}]`);
            const text = (path ?? false) ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

    /**
     * If the log field is true, logs a formatted error message.
     * @param str The message to log.
     * @param tag An optional tag specifying the context of the log. Default vaue is "ERROR".
     * @param path If the message to log should be formatted as path.
     */
    public error(str: string, tag?: string, path?: boolean): void {
        if (this.log) {
            const colouredTag = chalk.bold.red(`[${tag ?? 'ERROR'}]`);
            const text = (path ?? false) ? this.formatPath(str) : str;
            console.log(`${colouredTag} ${text}`);
        }
    }

}