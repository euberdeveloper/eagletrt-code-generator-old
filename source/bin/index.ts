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
        argv => {
            const args: any = argv;
            const src: string = args.src;
            const structureModel: string = args.structureModel;
            const configModel: string = args.configModel;
            const options: Options = {
                extensions: args.extensions,
                log: args.log,
                indent: args.indent,
                exclude: args.exclude
            };
            generate(src, structureModel, configModel, options);
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
        'structure-model': {
            alias: 's',
            describe: 'The path to the json file containing the structure model, used by generators to dynamically generate code about the data structure. The default is structure.model.json.',
            type: 'string',
            default: 'structure.model.json'
        },
        'config-model': {
            alias: 'c',
            describe: 'The path to the json file containing the config model, used by generators to dynamically generate code about the config parser. The default is config.model.json.',
            type: 'string',
            default: 'config.model.json'
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
        },
        'exclude': {
            describe: 'An array of strings that will be converted to RegExp, whose matching paths will be ignored. Default: "node_modules"',
            type: 'array',
            default: [ 'node_modules' ],
            coerce: value => value.map((el: string) => new RegExp(el))
        }
    })
    .epilogue('For more information, find our manual at https://github.com/euberdeveloper/eagletrt-code-generator#readme')
    .argv;