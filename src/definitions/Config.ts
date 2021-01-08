import { ConfigOptions } from "./ConfigOptions";

export class Config {
    private config_options:ConfigOptions;
    private blacklisted_phrases: string[];
    private whitelisted_symbols: string[];
    constructor(config_options:ConfigOptions, blacklisted_phrases: string[], whitelisted_symbols: string[]) {
        this.config_options = config_options;
        this.blacklisted_phrases = blacklisted_phrases;
        this.whitelisted_symbols = whitelisted_symbols;
    }

    GetConfigOptions():ConfigOptions{
        return this.config_options;

    }

    GetBlacklistedPhrases():string[]{
        return Array.from(this.blacklisted_phrases);
    }
    GetWhitelistedSymbols():string[]{
        return Array.from(this.whitelisted_symbols);
    }
}