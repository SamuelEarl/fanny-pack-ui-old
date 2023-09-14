import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: number;
        valAlign?: string;
        locale?: string;
        currency?: string;
        label?: string;
        padding?: string;
        fontSize?: string;
        labelAlign?: string;
        placeholder?: string;
        disabled?: boolean;
    };
    events: {
        change: Event;
        input: Event;
        blur: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type CurrencyInputProps = typeof __propDef.props;
export type CurrencyInputEvents = typeof __propDef.events;
export type CurrencyInputSlots = typeof __propDef.slots;
export default class CurrencyInput extends SvelteComponentTyped<CurrencyInputProps, CurrencyInputEvents, CurrencyInputSlots> {
}
export {};
