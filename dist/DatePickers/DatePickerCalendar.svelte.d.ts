import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
    };
    events: {
        hideDialog: CustomEvent<any>;
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DatePickerCalendarProps = typeof __propDef.props;
export type DatePickerCalendarEvents = typeof __propDef.events;
export type DatePickerCalendarSlots = typeof __propDef.slots;
export default class DatePickerCalendar extends SvelteComponentTyped<DatePickerCalendarProps, DatePickerCalendarEvents, DatePickerCalendarSlots> {
}
export {};
