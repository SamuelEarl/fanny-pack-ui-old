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
export type FlexColProps = typeof __propDef.props;
export type FlexColEvents = typeof __propDef.events;
export type FlexColSlots = typeof __propDef.slots;
export default class FlexCol extends SvelteComponentTyped<FlexColProps, FlexColEvents, FlexColSlots> {
}
export {};
