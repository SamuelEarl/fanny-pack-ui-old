import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label: any;
        forVal: any;
        id?: string;
        labelAlign?: string;
        tooltipIcon?: string;
        tooltipText?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LabelProps = typeof __propDef.props;
export type LabelEvents = typeof __propDef.events;
export type LabelSlots = typeof __propDef.slots;
export default class Label extends SvelteComponentTyped<LabelProps, LabelEvents, LabelSlots> {
}
export {};
