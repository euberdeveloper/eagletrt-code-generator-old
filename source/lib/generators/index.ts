import { scan } from 'dree';
import { Generator } from '../types';
import { Logger } from '../utils/logger';

/**
 * Returns all the generators classes, dynamically importing all the .generator files in the "generators" folder, analyizing in depth its directory structure. 
 * @param logger 
 */
export default function (logger: Logger): typeof Generator[] {
    const generators: typeof Generator[] = [];
    logger.info('Fetching code generators');

    scan(__dirname, { extensions: ['js'] }, file => {
        if (file.name.includes('.generator')) {
            const generator: typeof Generator = require(file.path).generator;
            generators.push(generator);

            logger.succ(file.relativePath.replace('.js', ''), 'FETCHED', true)
        }
    });

    return generators;
}
