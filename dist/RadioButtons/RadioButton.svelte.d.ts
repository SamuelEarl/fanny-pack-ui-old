import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id: any;
        group: any;
        value: any;
        label?: any;
        disabled?: boolean;
        marginBottom?: string;
        verticalAlignment?: string;
    };
    events: {
        change: Event;
        input: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RadioButtonProps = typeof __propDef.props;
export type RadioButtonEvents = typeof __propDef.events;
export type RadioButtonSlots = typeof __propDef.slots;
export default class RadioButton extends SvelteComponentTyped<RadioButtonProps, RadioButtonEvents, RadioButtonSlots> {
}
export {};
