import { SvelteComponentTyped } from "svelte";
import type { Locale } from "./locale";
declare const __propDef: {
    props: {
        label?: string;
        popup?: boolean;
        /** Date value. It's `null` if no date is selected */ value?: Date | null;
        /** The earliest year the user can select */ min?: Date;
        /** The latest year the user can select */ max?: Date;
        /** Locale object for internationalization */ locale?: Locale;
    };
    events: {
        focusout: FocusEvent;
        select: CustomEvent<undefined>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type CalendarProps = typeof __propDef.props;
export type CalendarEvents = typeof __propDef.events;
export type CalendarSlots = typeof __propDef.slots;
export default class Calendar extends SvelteComponentTyped<CalendarProps, CalendarEvents, CalendarSlots> {
}
export {};
