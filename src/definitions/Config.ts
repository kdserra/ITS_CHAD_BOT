import { ConfigOptions } from "./ConfigOptions";

export class Config {
    private config_options: ConfigOptions;
    private blacklisted_phrases: string[];
    private whitelisted_symbols: string[];
    private bot_list: string[];
    constructor(config_options: ConfigOptions, blacklisted_phrases: string[], whitelisted_symbols: string[], bot_list: string[]) {
        this.config_options = config_options;
        this.blacklisted_phrases = blacklisted_phrases;
        this.whitelisted_symbols = whitelisted_symbols;
        this.bot_list = bot_list;
    }

    GetConfigOptions(): ConfigOptions {
        return this.config_options;
    }

    GetBlacklistedPhrases(): string[] {
        return Array.from(this.blacklisted_phrases);
    }
    GetWhitelistedSymbols(): string[] {
        return Array.from(this.whitelisted_symbols);
    }
    GetBotList(): string[] {
        return Array.from(this.bot_list);
    }
}