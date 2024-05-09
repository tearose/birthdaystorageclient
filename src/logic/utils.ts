export default class Utils {
    static readonly months: string[] = ['January', 'February', 'March', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public static getDate(): number {
        return new Date().getDate();
    }

    public static getMonth(): string {
        const monthIndex: number = new Date().getMonth();
        return Utils.months[monthIndex];
    }
}