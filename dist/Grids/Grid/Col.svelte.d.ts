import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ColProps = typeof __propDef.props;
export type ColEvents = typeof __propDef.events;
export type ColSlots = typeof __propDef.slots;
export default class Col extends SvelteComponentTyped<ColProps, ColEvents, ColSlots> {
}
export {};
