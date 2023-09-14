/**
 * This function returns an ID that will be used in the <label> `for` attributes and the `id` attributes of form elements like <input> and <select>.
 */
export declare function createId(): string;
/**
 * This function will set the height of the select options list to be less-than or equal to the available space on the screen.
 */
export declare function calculateOptionsListHeight(id: any, showSelectOptionsList: any, tick: any, window: any): Promise<void>;
