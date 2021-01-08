import fs = require('fs');
import { ConfigOptions } from './definitions/ConfigOptions';
import { Config } from './definitions/Config';

function getConfigOptions(): ConfigOptions {
    const path: string = 'config/config.json';
    try {
        if (!fs.existsSync(path)) { fs.writeFileSync(path, JSON.stringify(new ConfigOptions(true))) };
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    catch {
        fs.writeFileSync(path, JSON.stringify(new ConfigOptions(true)));
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
}

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

let config = new Config(getConfigOptions(), getBlacklistedPhrasesFromConfig(), getWhitelistedSymbolsFromConfig())
export { config };