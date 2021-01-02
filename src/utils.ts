export { Utils }

class Utils {
    static GetCurrentTime(): string {
        return Date().slice(16, 21).toString();
    }
}