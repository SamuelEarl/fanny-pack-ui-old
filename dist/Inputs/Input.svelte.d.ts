import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        type?: string;
        value?: string;
        label?: string;
        list?: string;
        padding?: string;
        fontSize?: string;
        min?: any;
        max?: any;
        step?: string;
        placeholder?: string;
        disabled?: boolean;
    };
    events: {
        change: Event;
        input: Event;
        keyup: KeyboardEvent;
        blur: FocusEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponentTyped<InputProps, InputEvents, InputSlots> {
}
export {};
