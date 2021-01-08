import fs = require('fs');
import { Config } from './definitions/Config';

function getBlacklistedPhrasesFromConfig(): string[] {
    let output: string[] = [];
    try {
        const data = fs.readFileSync('config/blacklisted_phrases.txt', 'utf-8');
        const lines: string[] = data.split(/\r?\n/);
        for (let i: number = 0; i < lines.length; i++) {
            output.push(lines[i]);
        }
    } catch (err) {
        console.error(err);
    }
    return output;
}

function getWhitelistedSymbolsFromConfig(): string[] {
    let output: string[] = [];
    try {
        const data = fs.readFileSync('config/whitelisted_symbols.txt', 'utf-8');
        for (let i: number = 0; i < data.length; i++) {
            output.push(data[i]);
        }
    } catch (err) {
        console.error(err);
    }
    return output;
}

let config = new Config(getBlacklistedPhrasesFromConfig(), getWhitelistedSymbolsFromConfig())
export { config };