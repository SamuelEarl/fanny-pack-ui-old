import { SvelteComponentTyped } from "svelte";
import type { Locale } from "./locale";
declare const __propDef: {
    props: {
        label?: string;
        padding?: string;
        fontSize?: string;
        dateInputIcon?: string;
        disabled?: boolean;
        /** Date value */ value?: Date | null;
        /** The earliest value the user can select */ min?: Date;
        /** The latest value the user can select */ max?: Date;
        /** Placeholder text to show when input field is empty */ placeholder?: string;
        /** Whether the text is valid */ valid?: boolean;
        /** Locale object for internationalization */ locale?: Locale;
        /** Show or hide the calendar */ showCalendar?: boolean;
        /** Close the date popup when a date is selected */ closeOnSelection?: boolean;
    };
    events: {
        select: CustomEvent<undefined>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DateInputProps = typeof __propDef.props;
export type DateInputEvents = typeof __propDef.events;
export type DateInputSlots = typeof __propDef.slots;
export default class DateInput extends SvelteComponentTyped<DateInputProps, DateInputEvents, DateInputSlots> {
}
export {};
