import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        value?: string;
        /** Checks whether the ISO date string is valid */ isValid?: boolean;
        paddingV?: string;
        paddingH?: string;
        fontSize?: string;
        placeholder?: string;
        btnIcon?: string;
        btnIconSize?: number;
        disabled?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DatePickerInputProps = typeof __propDef.props;
export type DatePickerInputEvents = typeof __propDef.events;
export type DatePickerInputSlots = typeof __propDef.slots;
export default class DatePickerInput extends SvelteComponentTyped<DatePickerInputProps, DatePickerInputEvents, DatePickerInputSlots> {
}
export {};
