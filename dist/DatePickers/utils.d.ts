/**
 * Accept a date object and return a date string in ISO format (YYYY-MM-DD).
 */
export declare function getISOFromDateObj(dateObj: Date): string;
/**
 * Accept a date string in ISO format (YYYY-MM-DD) and return a date object.
 * NOTE: If I simply pass the ISO string to the `new Date()` constructor, then the date could be off by a day depending on the timezone. However, if I create a new Date object and then parse out the year, month, and day with the getUTC* functions (aka getISO* functions), then the date appears to be accurate. I think the reason for that is because the string that is being passed to this function is an ISO string and when you parse that string into a Date object using the getUTC* functions, then you will get the correct date. I think this is because both the input (ISO string) and output (Date object) are using the same timezone, so there are no one-off errors due to the timezone conversions.
 */
export declare function getDateObjFromISO(isoDateString: string): Date;
/**
 * This `isValidDate()` function is borrowed from this post:
 * https://stackoverflow.com/a/35413963/9453009
 */
export declare function isValidDate(dateString: string): boolean;
