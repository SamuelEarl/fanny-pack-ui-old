import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FlexRowProps = typeof __propDef.props;
export type FlexRowEvents = typeof __propDef.events;
export type FlexRowSlots = typeof __propDef.slots;
export default class FlexRow extends SvelteComponentTyped<FlexRowProps, FlexRowEvents, FlexRowSlots> {
}
export {};
