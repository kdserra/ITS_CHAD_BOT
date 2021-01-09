import { Config } from "./definitions/Config";
import { config } from "./config";

export { Utils }

class Utils {
    public static GetCurrentTime(): string {
        return Date().slice(16, 21);
    }
    public static GetDateFromTime(time: string): Date {
        let date: Date = new Date();
        let _time = time.replace(":", "");
        date.setHours(parseInt(_time.charAt(0) + _time.charAt(1)), parseInt(_time.charAt(2) + _time.charAt(3)));
        return date
    }
    public static GetElapsedMinutes(startDate: Date, endDate: Date): number {
        return Math.floor((Math.abs(startDate.getTime() - endDate.getTime()) / 1000) / 60);
    }

    public static SetCharAt(str: string, index: number, chr: string): string {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    public static PrintTimestamped(message: string): void {
        console.log("[" + Utils.GetCurrentTime() + "] " + message);
    }

    public static PrintLineTimestamped(): void {
        Utils.PrintTimestamped("-----------------------------");
    }

    public static PrintEmpty(): void {
        console.log(" ");
    }

    public static ReplaceAll(str: string, searchValue: string, replaceValue: string): string {
        return str.split(searchValue).join(replaceValue);
    }

    public static isAsciiOnly(str: string): boolean {
        return !(/[^\u0000-\u00ff]/.test(str));
    }

    public static RemoveEmojis(str: string): string {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
        return str.replace(regex, "");
    }

    public static RemoveUnicodeSymbol(str: string): string {
        const symbol_set: string[] = config.GetWhitelistedSymbols();
        let output: string = str;
        for (let i: number = 0; i < symbol_set.length; i++) {
            output = Utils.ReplaceAll(str, symbol_set[i], "");
        }
        return output;
    }

    public static RemoveSpecials(str: string): string {
        let output = Utils.RemoveEmojis(str);
        output = Utils.RemoveUnicodeSymbol(output);
        return output;
    }

    public static ContainsBlacklistedPhrase(str: string): boolean {
        for (let i: number = 0; i < config.GetBlacklistedPhrases().length; i++) {
            if (str.includes(config.GetBlacklistedPhrases()[i])) {
                return true;
            }
        }
        return false;
    }

    public static ConvertToASCII(str: string): string {
        return str.replace(/[^\x00-\x7F]/g, "");;
    }

    public static ConvertToStrongString(weak_str: string | undefined): string {
        if (weak_str === undefined) { return ""; }
        else { return weak_str; }
    }

    public static PrintConfig(): void {
        console.log("Blacklisted Phrases:" + config.GetBlacklistedPhrases());
        console.log("Whitelisted Symbols:" + config.GetWhitelistedSymbols());
    }
}