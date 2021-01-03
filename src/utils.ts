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
        return Math.abs(Math.round((startDate.getTime() - endDate.getTime()) / 60000));
    }

    public static SetCharAt(str:string,index:number,chr:string) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    public static PrintTimestamped(message:string){
        console.log("[" + Utils.GetCurrentTime() + "] " + message);
    }
}