import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        id?: string;
        options: any;
        optionLabel?: any;
        optgroup?: any;
        values: any;
        size?: string;
        tooltipText?: string;
        disabled?: boolean;
    };
    events: {
        change: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectMultiProps = typeof __propDef.props;
export type SelectMultiEvents = typeof __propDef.events;
export type SelectMultiSlots = typeof __propDef.slots;
export default class SelectMulti extends SvelteComponentTyped<SelectMultiProps, SelectMultiEvents, SelectMultiSlots> {
}
export {};
