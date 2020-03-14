import { scan } from 'dree';
import { Generator } from '../types';

const generators: typeof Generator[] = [];

scan(__dirname, { extensions: ['js'] }, file => {
    if (file.name.includes('.generator')) {
        const generator: typeof Generator = require(file.path).generator;
        generators.push(generator);
    }
});

export default generators;
