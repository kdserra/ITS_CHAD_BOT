export class Config {
    private blacklisted_phrases: string[];
    private whitelisted_symbols: string[];
    constructor(blacklisted_phrases: string[], whitelisted_symbols: string[]) {
        this.blacklisted_phrases = blacklisted_phrases;
        this.whitelisted_symbols = whitelisted_symbols;
    }

    GetBlacklistedPhrases():string[]{
        return Array.from(this.blacklisted_phrases);
    }
    GetWhitelistedSymbols():string[]{
        return Array.from(this.whitelisted_symbols);
    }
}