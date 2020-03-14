#!/usr/bin/env node
import * as yargs from 'yargs';
import { generate, Options } from '../lib/index';

yargs
    .scriptName('eagle')
    .command(
        'generate',
        'Generate dinamically code for the eagletrt telemetry',
        () => {
            return {};
        },
        async argv => {
            const args: any = argv;
            const src: string = args.src;
            const structure: string = args.structure;
            const options: Options = {
                extensions: args.extensions,
                log: args.log,
                indent: args.indent
            };
            generate(src, structure, options);
        }
    )
    .demandCommand(1, 'You must specify a command')
    .options({
        'src': {
            describe: 'The folder where the template files will be fetched from. The default is the current folder',
            type: 'string',
            default: process.cwd(),
            defaultDescription: 'The current folder'
        },
        'structure': {
            describe: 'The path to the json file containing the structure, used by generators to dynamically generate code. The default is structure.json',
            type: 'string',
            default: 'structure.json'
        },
        'extensions': {
            describe: 'An array of string representing the extensions that will be considered. Default undefined, all extensions will be considered',
            type: 'array',
            default: undefined,
            coerce: value => value[0] === undefined ? undefined : value
        },
        'log': {
            describe: 'If the log will be shown on the terminal',
            type: 'boolean',
            default: true
        },
        'indent': {
            describe: 'If the generated code will be indented the same as the comment it will substitute',
            type: 'boolean',
            default: true
        }
    })
    .epilogue('For more information, find our manual at https://github.com/euberdeveloper/eagletrt-code-generator#readme')
    .argv;