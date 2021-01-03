export { Utils }

class Utils {
    static GetCurrentTime(): string {
        return Date().slice(16, 21);
    }
    static GetDateFromTime(time: string): Date {
        let date: Date = new Date();
        let _time = time.replace(":", "");
        date.setHours(parseInt(_time.charAt(0) + _time.charAt(1)), parseInt(_time.charAt(2) + _time.charAt(3)));
        return date
    }
    static GetElapsedMinutes(startDate: Date, endDate: Date): number {
        return Math.abs(Math.round((startDate.getTime() - endDate.getTime()) / 60000));
    }
}